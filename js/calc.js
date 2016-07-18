var CalcFrase = (function(){
    
    function calcFraseCl() {
        this.calcResult;
        this.controlsInit();
    }
    
    calcFraseCl.prototype.parseFrase = function(fr)
    {
        if( fr.indexOf('=') !=  fr.length -1)
            return false;

        var rx = /(\+?|\/?|\*?|\-?)[^\+\-\*\/0-9\.]*?([0-9]+\.{1}[0-9]+|[0-9]+)/g;
        
        var result;
        
        while( res = rx.exec(fr) ) {
            switch (res[1]) {
                case '':
                    if( res.index === 0 )
                        result = parseFloat(res[2]);
                    break;
                case '+':
                    result+= parseFloat(res[2]);
                    break;
                case '-':
                    result-= parseFloat(res[2]);
                    break;
                case '*':
                    result*= parseFloat(res[2]);
                    break;
                case '/':
                    result/= parseFloat(res[2]);
                    break;
                default:
                    break;
            }
        
        }

        this.calcResult = this.modRound(result, 2);
    }

    calcFraseCl.prototype.controlsInit = function()
    {
        var that = this;
        var inp = document.getElementById('frase');
        var result = document.getElementById('result');
        inp.addEventListener('keyup', function(){
            var str = inp.value;
            var resHtml = '';
            that.parseFrase(str);
            if( that.calcResult !== false && that.calcResult !== null && that.calcResult !== undefined) 
                resHtml = that.calcResult;
            result.innerHTML = resHtml;
        });
    }

    calcFraseCl.prototype.modRound = function(num, symbolsAfterDot)
    {
        var k = Math.pow(10, parseInt(symbolsAfterDot) )
        var tmpNum = num * k;
        num = Math.ceil(tmpNum);
        return num / k; 
    }

    return calcFraseCl;

})();

var myCalc = new CalcFrase();
