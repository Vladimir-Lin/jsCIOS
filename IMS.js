class IMS {

  constructor ( appid , ims ) {
    this . App = appid ;
    this . IM  = ims   ;
    this . Purge ( )   ;
  }

  Purge ( )                                   {
    var input                                 ;
    input     = this  . IM                    ;
    if ( input . length > 128                 {
      this . IM = ""                          ;
      return this . IM                        ;
    }                                         ;
    input     = input . replace ( "\t" , "" ) ;
    input     = input . replace ( "\r" , "" ) ;
    input     = input . replace ( "\n" , "" ) ;
    input     = input . replace ( " "  , "" ) ;
    input     = input . replace ( "\\" , "" ) ;
    input     = input . replace ( "\"" , "" ) ;
    input     = input . replace ( "'"  , "" ) ;
    input     = input . replace ( "`"  , "" ) ;
    this . IM = input . trim    (           ) ;
    return this . IM                          ;
  }

  setApp ( appid )     {
    this . App = appid ;
  }

  setIM ( ims )      {
    this . IM = ims  ;
    this . Purge ( ) ;
  }

  getIM ( ) {
    return this . IM ;
  }

  isValid ( )                            {
    var im = this . IM                   ;
    if ( im . length <= 2 ) return false ;
    return true                          ;
  }

  Exists ( ) {
    var app = this . App ;
    var ims = this . IM  ;
    var exist = false ;
    CommonAJAX (
      AjaxAssetsPath ( "ajaxIMS.php" ) ,
      {
        Method : "Exists" ,
        App    : app      ,
        IMS    : ims      ,
      } ,
      function ( data ) {
        var tzHtml = data [ "Answer" ] ;
        if ( tzHtml === 'Yes' ) {
          exist = true ;
        }
      }
    ) ;
    return exist ;
  }

  Correctness ( id ) {
    var correct = false ;
    if ( this . IM . length <= 0 ) {
      $( id ) . css ( "background-color" , "transparent" ) ;
      return ;
    }
    if ( this . isValid ( ) ) {
      correct = true ;
    }
    if ( correct ) {
      if ( this . Exists ( ) ) {
        correct = false ;
        $( id ) . css ( "background-color" , "lightcoral" ) ;
        return ;
      }
    }
    if ( ! correct ) {
      $( id ) . css ( "background-color" , "bisque" ) ;
      return ;
    }
    $( id ) . css ( "background-color" , "transparent" ) ;
  }

}

var VerifyIMS = function ( appid , id )
{
  var app     = $( appid ) . val ( ) ;
  var account = $( id    ) . val ( ) ;
  var im      = new IMS ( app , account ) ;
  $( id ) . val ( im . getIM ( ) ) ;
  im . Correctness ( id ) ;
}
