class QuadraticFunction{
    constructor(){
        this.canvas = document.querySelector('.graph');
        this.canvas.width = 99;
        this.canvas.height = 99;
        this.canvasInitialSize = this.canvas.width;
        this.c = this.canvas.getContext('2d');
        this.graphCenter = {x: this.canvas.width / 2, y: this.canvas.height / 2};
        this.zoom = 1;
        this.zoomSpeed = 0.01;

        this.data = {};

        //DONE?
        addEventListener('wheel', (e) => {
            let scale = e.deltaY * this.zoomSpeed;
            if(this.zoom + scale < 0.5)
                return;
            if(this.zoom + scale > 10)
                return;
            this.zoom += scale;
            this.canvas.width = this.canvasInitialSize * this.zoom;
            this.canvas.height = this.canvasInitialSize * this.zoom;
            this.graphCenter = {x: this.canvas.width / 2, y: this.canvas.height / 2};
            console.log('a?');

            this.drawGraph(this.data.a, this.data.b, this.data.c);
        })
    }

    //DONE?
    drawGraph(a, b, c){
        let amount = 1 * this.zoom;

        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.beginPath();
        this.c.moveTo(this.canvas.width / 2, 0);
        this.c.lineTo(this.canvas.width / 2, this.canvas.height);
        this.c.stroke();
        
        this.c.beginPath();
        this.c.moveTo(0, this.canvas.height / 2);
        this.c.lineTo(this.canvas.width, this.canvas.height / 2);
        this.c.stroke();


        this.c.beginPath();
        this.c.moveTo(this.graphCenter.x, this.graphCenter.y);
        for(let x = 0; x >= -this.canvas.width / 2; x--){
            let countedA = a * (x * x);
            let countedB = b * x;
            
            let countedX = countedA + countedB + c;
            this.c.lineTo(this.graphCenter.x + x, this.graphCenter.y - countedX);
        }
        this.c.stroke();
        
        this.c.beginPath();
        this.c.moveTo(this.graphCenter.x, this.graphCenter.y);
        for(let x = 0 / 2; x < this.canvas.width / 2; x++){
            let countedA = a * (x * x);
            let countedB = b * x;
            
            let countedX = countedA + countedB + c;
            this.c.lineTo(this.graphCenter.x + x, this.graphCenter.y - countedX);
        }
        this.c.stroke();

    }

    //DONE CLEAR
    countDelta(a, b,c){
        return b * b - 4 * a * c;
    }

    //DONE CLEAR
    countRoots(a, b, c){
        let delta = this.countDelta(a, b, c);

        if(delta < 0)
            return {one: 'No', two: 'No'};
        if(delta === 0){
            return {one: -b / (2 * a), two: 'No'};
        }
        if(delta > 0){
            return {
                one: (-b - Math.sqrt(delta)) / (2 * a), 
                two: (-b + Math.sqrt(delta)) / (2 * a)
            };
        }
    }

    //DONE CLEAR
    makeCanonicalForm(a, b, c){
        if(a === 0)
            return;
        
        let apex = this.countApex(a, b, c);
        return `${a}(x - ${apex.p})² + ${apex.q}`;
    }

    //DONE
    makeInterceptForm(a, b, c){
        if(a === 0)
            return;

        let roots = this.countRoots(a, b, c);

        if(roots.two === 'No')
            return `${a}(x - ${roots.one})²`;
        if(roots.two !== 'No')
            return `${a}(x - ${roots.one})(x - ${roots.two})`;
    }

    //DONE
    countApex(a, b, c){
        let delta = this.countDelta(a, b, c);
        return {
            p: -b / (2 * a), 
            q: -delta / (4 * a)
        };
    }

    countQuadraticFunction(a, b, c){
        this.data = {a: a, b: b, c: c};

        let delta = this.countDelta(a, b, c);
        let roots = this.countRoots(a, b, c);
        let canonicalForm = this.makeCanonicalForm(a, b, c);
        let interceptForm = this.makeInterceptForm(a, b, c);
        let apex = this.countApex(a, b, c);

        this.drawGraph(a, b, c);

        console.clear();
        console.log(`Function: ${a}x² + ${b}x + ${c}`);
        console.log(`Canonical Form: ${canonicalForm}`);
        console.log(`Intercept Form: ${interceptForm}`);
        console.log(`Delta: ${delta}`);
        console.log(`Roots: ${roots.one}, ${roots.two}`);
        console.log(`Apex: q - ${apex.q}, p - ${apex.p}`);
    }
}

//ADD EVERYWHERE WHERE a != 0 return.