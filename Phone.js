class Phone {

  constructor ( isd , ac , num ) {
    this . ISD      = isd ;
    this . AreaCode = ac  ;
    this . Number   = num ;
    this . Purge ( )      ;
  }

  Purge ( )                                       {
    var input                                     ;
    var phs       = ''                            ;
    var c                                         ;
    var len                                       ;
    var i                                         ;
    var allows    = "0123456789-"                 ;
    input         = this  . Number                ;
    if ( input . length > 64 )                    {
      this . Number = ""                          ;
      return this . Number                        ;
    }                                             ;
    input         = input . replace ( "\t" , "" ) ;
    input         = input . replace ( "\r" , "" ) ;
    input         = input . replace ( "\n" , "" ) ;
    input         = input . replace ( " "  , "" ) ;
    input         = input . replace ( "\\" , "" ) ;
    input         = input . replace ( "\"" , "" ) ;
    input         = input . replace ( "'"  , "" ) ;
    input         = input . replace ( "`"  , "" ) ;
    input         = input . trim    (           ) ;
    len           = input . length                ;
    for ( i = 0 ; i < len ; i++ )                 {
      c = input . charAt ( i )                    ;
      if ( allows . indexOf ( c ) >= 0 )          {
        phs = phs + c                             ;
      }                                           ;
    }                                             ;
    this . Number = phs                           ;
    return this . Number                          ;
  }

  setISD ( isd ) {
    this . ISD = isd ;
    this . Purge ( ) ;
  }

  setAreaCode ( areacode ) {
    this . AreaCode = areacode ;
    this . Purge ( )           ;
  }

  setNumber ( number ) {
    this . Number = number ;
    this . Purge ( )       ;
  }

  getNumber ( ) {
    return this . Number ;
  }

  isValid ( ) {
    var num = this . Number               ;
    if ( num . length <= 0 ) return false ;
    return true                           ;
  }

  Exists ( ) {
    var isd = this . ISD      ;
    var ac  = this . AreaCode ;
    var num = this . Number   ;
    var exist = false ;
    CommonAJAX (
      AjaxAssetsPath ( "ajaxPhones.php" ) ,
      {
        Method   : "Exists" ,
        ISD      : isd      ,
        AreaCode : ac       ,
        Number   : num      ,
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
    if ( this . AreaCode > 0 ) {
      if ( this . Number . length <= 0 ) {
        $( id ) . css ( "background-color" , "bisque" ) ;
        return ;
      }
    } else {
      if ( this . Number . length <= 0 ) {
        $( id ) . css ( "background-color" , "transparent" ) ;
        return ;
      }
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

var VerifyPhone = function ( isdid , acid , numid )
{
  var isd      = $( isdid ) . val ( ) ;
  var areacode = $( acid  ) . val ( ) ;
  var number   = $( numid ) . val ( ) ;
  var ph       = new Phone ( isd , areacode , number ) ;
  $( numid ) . val ( ph . getNumber ( ) ) ;
  ph . Correctness ( numid ) ;
}
