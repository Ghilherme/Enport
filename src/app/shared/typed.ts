export default class Typed {
    //starting position of the string in parameter
    public posicao:number = 0
    public complete : boolean = false
    
    typeWriter(element: string, txt: string, speed: number,) {    
        var that = this
        let intervaloVirgula: number = 500
        let intervaloPonto: number = 1000

        if (this.posicao < txt.length) {
            
            document.getElementById(element).innerHTML += txt.charAt(this.posicao);
            this.posicao++;
            
            let strNaPosicao = txt.charAt(this.posicao - 1)
            switch (strNaPosicao) {
                case '.':
                    setTimeout(function () { that.typeWriter(element, txt, speed) }, speed + intervaloPonto);
                    break;
                case ',':
                    setTimeout(function () { that.typeWriter(element, txt, speed) }, speed + intervaloVirgula);
                    break;
                default:
                    setTimeout(function () { that.typeWriter(element, txt, speed) }, speed);
                    break;
            }            
        }
        else{
            this.complete = true
        }
    }
}