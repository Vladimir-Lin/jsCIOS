var CommonAjaxError = function ( xhr , ajaxOptions , thrownError )
{
  alert ( thrownError + " => " + ajaxOptions ) ;
}

var ReportAjaxProblem = function ( data )
{
  alert ( data [ "Problem" ] ) ;
}

var SilenceAJAX = function ( data )
{
  var tzHtml = data [ "Answer" ] ;
  if ( tzHtml === 'Yes' ) {
  } else {
    ReportAjaxProblem ( data ) ;
  } ;
}

var NormalAJAX = function ( URL , DATA , FUNC , ErrorFunction )
{
  $.ajax({
    url: URL ,
    type: "POST",
    cache: false,
    async: false,
    dataType: 'json',
    data: DATA,
    success: FUNC,
    error: ErrorFunction,
  });
}

var AssignAJAX = function ( URL , DATA )
{
  NormalAJAX ( URL , DATA , SilenceAJAX , CommonAjaxError ) ;
}

var CommonAJAX = function ( URL , DATA , FUNC )
{
  NormalAJAX ( URL , DATA , FUNC , CommonAjaxError ) ;
}

var FetchByAJAX = function ( URL , DATA , Section )
{
  $.ajax({
    url: URL ,
    type: "POST",
    cache: false,
    async: false,
    dataType: 'json',
    data: DATA,
    success: function ( data ) {
      var tzHtml = data [ "Answer" ] ;
      if ( tzHtml === "Yes" ) {
        $( Section ) . html ( data [ "Message" ] ) ;
      } else {
      }
    }
  });
}

var GetSession = function ( tag )
{
  var answer = { ready: false , value: "" } ;
  CommonAJAX (
    AjaxAssetsPath ( "ajaxGetSession.php" ) ,
    {
      Tag: tag,
    },
    function ( data ) {
      var tzHtml = data [ "Answer" ] ;
      if ( tzHtml === "Yes" ) {
        answer . ready = true ;
        answer . value = data [ "Value" ] ;
      } else {
      }
    }
  ) ;
  return answer ;
}

var GetSessions = function ( tag , splitter )
{
  var answer = GetSession ( tag ) ;
  var empty  = [ ] ;
  if ( answer . length <= 0 ) return empty ;
  return answer . split ( splitter ) ;
}

var SetSession = function ( tag , value )
{
  var answer = false ;
  CommonAJAX (
    AjaxAssetsPath ( "ajaxSetSession.php" ) ,
    {
      Tag: tag,
      Value: value,
    },
    function ( data ) {
      var tzHtml = data [ "Answer" ] ;
      if ( tzHtml === "Yes" ) {
        answer = true ;
      } else {
      }
    }
  ) ;
  return answer ;
}

var PurgeInput = function ( input )
{
  input = input . replace ( "/t" , "" ) ;
  input = input . replace ( "/r" , "" ) ;
  input = input . replace ( "/n" , "" ) ;
  return  input                         ;
}

var NameChangedWithTable = function ( table , uuid , name , locality , priority = 0 , relevance = 0 )
{
  var v = PurgeInput ( name ) ;
  v = v . trim ( ) ;
  AssignAJAX (
    AjaxAssetsPath ( "ajaxName.php" ) ,
    {
      Table: table ,
      Uuid: uuid ,
      Name: v ,
      Locality: locality ,
      Priority: priority ,
      Relevance: relevance ,
    }
  ) ;
}

var DefaultNameChanged = function ( uuid , name , locality , priority = 0 , relevance = 0 )
{
  var v = PurgeInput ( name ) ;
  v = v . trim ( ) ;
  AssignAJAX (
    AjaxAssetsPath ( "ajaxName.php" ) ,
    {
      Uuid: uuid,
      Name: v ,
      Locality: locality,
      Priority: priority ,
      Relevance: relevance ,
    }
  ) ;
}

function FullHeight ( id , topPosition = 20 )
{
  var p = $( id ) . offset ( ) ;
  return parseInt ( $( window ) . height ( ) - p . top - topPosition ) ;
}
