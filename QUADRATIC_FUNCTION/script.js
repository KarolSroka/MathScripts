/*
    TO DO:
    1. CHANGE THE CONSTRUCTOR A LOT.
*/


class QuadraticFunction{
    constructor(){

        this.calculateButton = document.querySelector('.calculate');
        this.showButton = document.querySelector('.show-graph');
        this.hideButton = document.querySelector('.close-graph');
        this.dialog = document.querySelector('.graph-pop-up');
        this.canvas = document.querySelector('.graph');

        this.data = {};

        this.graph = {
            position: {
                x: 0,
                y: 0
            },
            zoom: 1,
            zoomSpeed: 0.01
        }
        this.canvas.width = 99;
        this.canvas.height = 99;
        this.c = this.canvas.getContext('2d');
        this.canvasInitialSize = this.canvas.width;

        this.graph.center = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }

        addEventListener('wheel', this.handleGraphZoom);
        addEventListener('keydown', this.handleGraphMovement);
        this.calculateButton.addEventListener('click', () => {this.initCalculations()});
        this.showButton.addEventListener('click', () => {this.dialog.showModal()});
        this.hideButton.addEventListener('click', () => {this.dialog.close()});
    }

    initCalculations(){
        const a = Number(document.querySelector('.a').value);
        const b = Number(document.querySelector('.b').value);
        const c = Number(document.querySelector('.c').value);

        this.data = {a: a, b: b, c: c};

        this.countQuadraticFunction();
    }

    //CLEAN
    handleGraphMovement = (e) => {

        switch(e.key){

            case 'ArrowLeft':
                this.graph.position.x += 5;
                break;

            case 'ArrowRight':
                this.graph.position.x -= 5;
                break;

            case 'ArrowUp':
                this.graph.position.y += 5;
                break;

            case 'ArrowDown':
                this.graph.position.y -= 5;
                break;
                
            case 'r':
                this.graph.position.y = 0;
                this.graph.position.x = 0;
                break;

        }

        this.drawGraph(this.data.a, this.data.b, this.data.c);
    }

    //CLEAN
    handleGraphZoom = (e) => {
        let scale = e.deltaY * this.graph.zoomSpeed;

        if(this.graph.zoom + scale < 0.5)
            return;
        if(this.graph.zoom + scale > 10)
            return;

        this.graph.zoom += scale;

        this.canvas.width = this.canvasInitialSize * this.graph.zoom;
        this.canvas.height = this.canvasInitialSize * this.graph.zoom;

        this.graph.center = {
            x: this.canvas.width / 2, 
            y: this.canvas.height / 2
        };

        this.drawGraph();
    }

    //DONE?
    drawGraph(){
        const a = this.data.a;
        const b = this.data.b;
        const c = this.data.c;

        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.beginPath();
        this.c.moveTo(this.canvas.width / 2 + this.graph.position.x, 0);
        this.c.lineTo(this.canvas.width / 2 + this.graph.position.x, this.canvas.height);
        this.c.stroke();
        
        this.c.beginPath();
        this.c.moveTo(0, this.canvas.height / 2 + this.graph.position.y);
        this.c.lineTo(this.canvas.width, this.canvas.height / 2 + this.graph.position.y);
        this.c.stroke();


        this.c.beginPath();
        this.c.moveTo(this.graph.center.x + this.graph.position.x, this.graph.center.y + this.graph.position.y);
        for(let x = 0; x >= -this.canvas.width / 2 - this.graph.center.x; x--){
            let countedA = a * (x * x);
            let countedB = b * x;
            
            let countedX = countedA + countedB + c;
            this.c.lineTo(this.graph.center.x + x + this.graph.position.x, this.graph.center.y - countedX + this.graph.position.y);
        }
        this.c.stroke();
        
        this.c.beginPath();
        this.c.moveTo(this.graph.center.x + this.graph.position.x, this.graph.center.y + this.graph.position.y);
        for(let x = 0 / 2; x < this.canvas.width / 2 + this.graph.center.x; x++){
            let countedA = a * (x * x);
            let countedB = b * x;
            
            let countedX = countedA + countedB + c;
            this.c.lineTo(this.graph.center.x + x + this.graph.position.x, this.graph.center.y - countedX + this.graph.position.y);
        }
        this.c.stroke();
    }

    countQuadraticFunction(){
        const a = this.data.a;
        const b = this.data.b;
        const c = this.data.c;

        let delta = this.countDelta(a, b, c);
        let roots = this.countRoots(a, b, c);
        let apex = this.countApex(a, b, c);

        this.drawGraph();

        document.querySelector('.form').textContent = `Function: ${a}x² + ${b}x + ${c}`;
        document.querySelector('.canonical-form').textContent = `Canonical Form: ${this.makeCanonicalForm(a, b, c)}`;
        document.querySelector('.intercept-form').textContent = `Intercept Form: ${this.makeInterceptForm(a, b, c)}`;
        document.querySelector('.delta').textContent = `Delta: ${delta}`;
        document.querySelector('.roots').textContent = `Roots: ${roots.one}, ${roots.two}`;
        document.querySelector('.apex').textContent = `Apex: q - ${apex.q}, p - ${apex.p}`;
    }

    //CLEAR
    countDelta(a, b,c){
        return b * b - 4 * a * c;
    }

    //CLEAR
    countRoots(a, b, c){
        let delta = this.countDelta(a, b, c);

        if(delta < 0)
            return {one: 'No', two: 'No'};
        if(delta === 0)
            return {one: -b / (2 * a), two: 'No'};
        if(delta > 0)
            return {
                one: (-b - Math.sqrt(delta)) / (2 * a), 
                two: (-b + Math.sqrt(delta)) / (2 * a)
            };
    }

    //CLEAR
    makeCanonicalForm(a, b, c){
        if(a === 0)
            return;
        
        let apex = this.countApex(a, b, c);
        return `${a}(x - ${apex.p})² + ${apex.q}`;
    }

    //CLEAR
    makeInterceptForm(a, b, c){
        if(a === 0)
            return;

        let roots = this.countRoots(a, b, c);

        if(roots.two === 'No')
            return `${a}(x - ${roots.one})²`;
        if(roots.two !== 'No')
            return `${a}(x - ${roots.one})(x - ${roots.two})`;
    }

    //CLEAR
    countApex(a, b, c){
        let delta = this.countDelta(a, b, c);
        return {
            p: -b / (2 * a), 
            q: -delta / (4 * a)
        };
    }
}

const quadFunction = new QuadraticFunction();