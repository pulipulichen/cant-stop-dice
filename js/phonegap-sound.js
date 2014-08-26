// 取得Phonegap可識別的檔案路徑 .
function getPhoneGapPath() 
{
    var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    return 'file://' + path;
}

// 藉由PhoneGap API來播放音效檔
function playAudio( url )
{    
    if (typeof(Media) === "undefined") {
        return;
    }
    
    // Play the audio file at url
    var my_media = new Media( url,
                          // success callback
                          function()
    {
        console.log( "playAudio():Audio Success" );
    },
    // error callback
    function( err )
    {
        console.log( "playAudio():Audio Error: " + err );
    } );

    my_media.play(); // 開始播放

    //my_media.stop();
    //my_media.release();
}

playAudio( getPhoneGapPath() + "img/blop.mp3" ); 