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

var PurgeInput = function ( input )
{
  input = input . replace ( "/t" , "" ) ;
  input = input . replace ( "/r" , "" ) ;
  input = input . replace ( "/n" , "" ) ;
  return  input                         ;
}
