class EMail {

  constructor ( email ) {
    this . Mail = email ;
    this . Purge ( )    ;
  }

  Purge ( )                                     {
    var input                                   ;
    input       = this  . Mail                  ;
    input       = input . replace ( "\t" , "" ) ;
    input       = input . replace ( "\r" , "" ) ;
    input       = input . replace ( "\n" , "" ) ;
    input       = input . replace ( " "  , "" ) ;
    input       = input . replace ( "\\" , "" ) ;
    input       = input . replace ( "\"" , "" ) ;
    input       = input . replace ( "'"  , "" ) ;
    input       = input . replace ( "`"  , "" ) ;
    this . Mail = input . trim    (           ) ;
    return this . Mail                          ;
  }

  setEMail ( email )    {
    this . Mail = email ;
    this . Purge ( )    ;
  }

  getEMail ( ) {
    return this . Mail ;
  }

  isValid ( )                                        {
    var  email = this  . Mail                        ;
    if ( email . length          <= 0 ) return false ;
    if ( email . indexOf ( "@" ) <  0 ) return false ;
    var  edom  = email . split ( "@" )               ;
    if ( edom  . length          <  2 ) return false ;
    var  exom  = edom [ 1 ]                          ;
    if ( exom  . indexOf ( "." ) <  0 ) return false ;
    var  ezom  = exom  . split ( "." )               ;
    if ( ezom  . length          <  2 ) return false ;
    if ( ezom [ 0 ] . length     <  1 ) return false ;
    if ( ezom [ 1 ] . length     <  1 ) return false ;
    return true                                      ;
  }

  Exists ( ) {
    var email = this . Mail ;
    var exist = false ;
    CommonAJAX (
      AjaxAssetsPath ( "ajaxEMails.php" ) ,
      {
        Method : "Exists" ,
        EMail  : email    ,
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
    if ( this . Mail . length <= 0 ) {
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

var VerifyEmail = function ( email , id )
{
  var em  = new EMail ( email ) ;
  $( id ) . val ( em . getEMail ( ) ) ;
  em . Correctness ( id ) ;
}
