
// ([а-я])[а-я]*[\s|;][а-я]+\1[а-я]*\s[а-я]+\1[а-я]*\s[а-я]+\1

//[\s;!?.,:]*([а-яА-Я-]+)|([а-яА-Я-]+)[\s;!?.,:]*

// var str = 'Чегс изволите-?Барон-с!Сударо-с';
// // var str = 'Чего-с изволите-с Барин-с';
// var rx = /[\s;!?.,:]*([а-я-]+)|([а-я-]+)[\s;!?.,:]*/gi
// var r = str.match(rx);
// var i;

// var newRxStr = '([а-яА-я-])';
// for( i = 1; i < r.length; i++ ) {
//     newRxStr+='[а-яА-я-]*[\\s|;|?|!|,|\\.][а-яА-я-]+\\1';
// }


// var newRx = new RegExp( newRxStr, 'i' );
// // var newRx = /([а-я])[а-я]*[а-я]*\s[а-я]+\1[а-я]*\s[а-я]+\1/gi



// var r2 = newRx.exec( str );
// console.log(newRxStr);
// console.log(r2);

// var newS = str.split(r2[1]).join('');
// console.log(newS);

/**
 * ([а-яА-я-])[а-яА-я-]*[\s|;|?|!|,|\.][а-яА-я-]+\1[а-яА-я-]*[\s|;|?|!|,|\.][а-яА-я-]+\1
 */

var SameSymbolsRm = (function(){
    function sameRm()
    {
        this.result;
    }

    sameRm.prototype.removeSyms = function(str)
    {
        var cutSym;
        while( cutSym = this.findSame(str) ) {
            str = str.split(cutSym).join('');
        }
        this.result = str;
        return this;
    }

    sameRm.prototype.findSame = function( str ) {
        var wordsRx = /[\s;!?.,:]*([а-я-]+)|([а-я-]+)[\s;!?.,:]*/gi;
        var words = str.match(wordsRx);
        var i, newRx, r2;
        var generateRxStr = '([а-яА-я-])';

        if( !words || words.length < 2)
            return false;

        for( i = 1; i < words.length; i++ ) {
            generateRxStr+='[а-яА-я-]*[\\s|;|?|!|,|\\.][а-яА-я-]+\\1';
        }

        newRx = new RegExp( generateRxStr, 'i' );
        r2 = str.match( newRx );

        if( r2 === null || !r2)
            return false;
        return r2[1];
    }

    return sameRm;
})();


// str = 'Чего-с';

// console.log(s.result);

(function(){
    var rmr = new SameSymbolsRm();
    var cutInp = document.getElementById('text');
    var resEl = document.getElementById('cut-result');

    cutInp.addEventListener('keyup', function(){
        var string = cutInp.value;
        string = rmr.removeSyms(string).result;
        resEl.innerHTML = string;
    });

})()