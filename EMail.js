class EMail {

  constructor ( email = "" ) {
    this . EMail = email ;
    this . Purge ( )     ;
  }

  get Purge ( )                                  {
    input        = this  . EMail                 ;
    input        = input . replace ( "\t" , "" ) ;
    input        = input . replace ( "\r" , "" ) ;
    input        = input . replace ( "\n" , "" ) ;
    this . EMail = input . trim    (           ) ;
    return this . EMail                          ;
  }

  set setEMail ( email ) {
    this . EMail = email ;
    this . Purge ( )     ;
  }

  get getEMail ( ) {
    return this . EMail ;
  }

  get isValid ( ) {
    email = this . EMail                             ;
    if ( email . length          <= 0 ) return false ;
    if ( email . indexOf ( "@" ) <  0 ) return false ;
    var edom = email      . split ( "@" )            ;
    if ( edom  . length          < 1  ) return false ;
    var exom = edom [ 1 ] . split ( "." )            ;
    if ( exom  . indexOf ( "." ) <  0 ) return false ;
    return true                                      ;
  }

}
