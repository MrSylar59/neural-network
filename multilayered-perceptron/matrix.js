/*
 * This is a simple matrix library only made for learning purpose
 */

class Matrix {
    /**
     * Constructor function creating and initializing a new r*c matrix
     * 
     * @param {Number} rows 
     * @param {Number} cols 
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < this.rows; i++){
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = 0;
        }
    }

    random(){
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = Math.random()*2-1;
    }

    /* SCALAR + ELEMENTWISE OPERATIONS */

    add(n){
        if (n instanceof Matrix){
            for (let i = 0; i < this.rows; i++)
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] += n.data[i][j];
        }
        else{
            for (let i = 0; i < this.rows; i++)
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] += n;
        }
    }

    multiply(n){
        if (n instanceof Matrix){
            this.hadamard(n);
        }
        else{
            // Scalar product
            for (let i = 0; i < this.rows; i++)
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] *= n;
        }
    }

    map(f){
        // Applies a function to every element of a matrix
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++){
                let val = this.data[i][j];
                this.data[i][j] = f(val);
            }
    }

    hadamard(n){
        for (let i = 0; i < this.rows; i++)
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] *= n.data[i][j]; // Hadamard multiplication
    }

    print(){
        console.table(this.data);
    }

    toArray(){
        let arr = [];
        
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                arr.push(this.data[i][j]);
        
        return arr;
    }

    static map(m, f){
        let result = new Matrix(m.rows, m.cols);

        for (let i = 0; i < m.rows; i++)
            for (let j = 0; j < m.cols; j++)
                result.data[i][j] = f(m.data[i][j]);

        return result;
    }

    static multiply(m1, m2) {
        // Matrix product
            if (m1.cols !== m2.rows){
                console.error("Columns of A must match rows of B!");
                return undefined;
            }

            let result = new Matrix(m1.rows, m2.cols);

            for (let i = 0; i < result.rows; i++)
                for (let j = 0; j < result.cols; j++){
                    let sum = 0;
                    for (let k = 0; k < m1.cols; k++){
                        sum += m1.data[i][k] * m2.data[k][j];
                    }
                    result.data[i][j] = sum;
                }

            return result;
    }

    static subtract(a, b){
        let m = new Matrix(a.rows, a.cols);

        for (let i = 0; i < m.rows; i++)
            for (let j = 0; j < m.cols; j++)
                m.data[i][j] = a.data[i][j] - b.data[i][j];

        return m;
    }

    static transpose(matrix){
        let result = new Matrix(matrix.cols, matrix.rows);

        for (let i = 0; i < matrix.rows; i++)
            for (let j = 0; j < matrix.cols; j++){
                result.data[j][i] = matrix.data[i][j];
            }

        return result;
    }

    static fromArray(arr){
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++)
            m.data[i][0] = arr[i];
        return m;
    }
}