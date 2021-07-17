const Game = class {
    constructor(n) {
        this.array = [];
        this.makeArray(n);
        this.displayArray(this.array)
    }

    makeArray = (n) => {
        for (let i = 0; i < n; i++) {
            this.array.push([]);
            for (let j = 0; j < n; j++) {
                this.array[i].push(0)
            }
        }
    }

    displayArray = () => {
        $('#display').html('')
        for (let i = 0; i < this.array.length; i++) {
            $('#display').append(`<tr id="r${i}"></tr>`)
            for (let j = 0; j < this.array[i].length; j++) {
                $(`#r${i}`).append(`<td>${this.array[i][j]}</td>`)
            }
        }
    }

    generateNum = () => {
        //多次元配列から１次元配列に変換
        let arr = this.array.flat();

        //値が空である位置番号を全て取り出す
        let empArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == 0) {
                empArr.push(i)
            }
        }
        //値が空であるうちランダムな1つのマスを２または４にする（９：１の割合）
        const rnd = Math.floor(Math.random() * empArr.length);
        const s = Math.random()
        if (s > 0.1) {
            arr[empArr[rnd]] = 2
        } else {
            arr[empArr[rnd]] = 4
        }
        // console.log(arr);
        //１次元配列から多次元配列に変換
        let newArr = []
        const r = this.array.length
        for (let k = 0; k < r; k++) {
            newArr.push([]);
        }

        let m, n
        for (let l = 0; l < arr.length; l++) {
            m = Math.floor(l / r)
            n = l % r
            newArr[m][n] = arr[l]
        }
        // console.log(newArr);

        this.array = newArr;
    }

    up = () => {
        //転置行列を返す
        const transpose = (a) => a[0].map((_, c) => a.map(r => r[c]));
        let tArray = transpose(this.array);
        //以下、leftと同じ
        let new_array = []
        //まず各列を左詰めにし、左から隣合う数字が等しければ合計し、また左詰めにする
        for (let i = 0; i < tArray.length; i++) {
            let new_row = [] //左詰め後の配列
            for (let j = 0; j < tArray[i].length; j++) {
                if (tArray[i][j] != 0) {
                    new_row.push(tArray[i][j])
                }
            }
            let count = tArray[i].filter(el => el === 0).length; //０の個数
            for (let k = 0; k < count; k++) {
                new_row.push(0)
            }

            for (let l = 0; l < new_row.length - 1; l++) {
                if (new_row[l] != 0 && new_row[l] == new_row[l + 1]) {
                    new_row[l] = new_row[l] * 2 //隣り合う２つのうち左側を倍にし、
                    new_row.splice(l + 1, 1) //右側を削除し、
                    new_row.push(0) //末尾に0を追加する
                    $('#score').html(parseInt($('#score').text()) + new_row[l] * 2) //スコアを加算
                }
            }
            new_array.push(new_row)
        }
        //再度転置
        new_array = transpose(new_array)
        console.log(new_array);

        if (this.change(new_array)) {
            //変化がある場合のみ１つ数字を増やす
            this.array = new_array
            this.generateNum()
        }

        //画面を更新
        this.displayArray()

    }

    left = () => {
        let new_array = []
        //まず各列を左詰めにし、左から隣合う数字が等しければ合計し、また左詰めにする
        for (let i = 0; i < this.array.length; i++) {
            let new_row = [] //左詰め後の配列
            for (let j = 0; j < this.array[i].length; j++) {
                if (this.array[i][j] != 0) {
                    new_row.push(this.array[i][j])
                }
            }
            let count = this.array[i].filter(el => el === 0).length; //０の個数
            for (let k = 0; k < count; k++) {
                new_row.push(0)
            }

            for (let l = 0; l < new_row.length - 1; l++) {
                if (new_row[l] != 0 && new_row[l] == new_row[l + 1]) {
                    new_row[l] = new_row[l] * 2 //隣り合う２つのうち左側を倍にし、
                    new_row.splice(l + 1, 1) //右側を削除し、
                    new_row.push(0) //末尾に0を追加する
                    $('#score').html(parseInt($('#score').text()) + new_row[l] * 2) //スコアを加算
                }
            }
            new_array.push(new_row)
        }
        console.log(new_array);

        if (this.change(new_array)) {
            //変化がある場合のみ１つ数字を増やす
            this.array = new_array
            this.generateNum()
        }

        //画面を更新
        this.displayArray()
    }

    down = () => {
        //転置行列を返す
        const transpose = (a) => a[0].map((_, c) => a.map(r => r[c]));
        let tArray = transpose(this.array);

        let new_array = []
        //まず各列を右詰めにし、右から隣合う数字が等しければ合計し、また右詰めにする
        for (let i = 0; i < tArray.length; i++) {
            let new_row = [] //右詰め後の配列
            for (let j = tArray[i].length - 1; j >= 0; j--) {
                if (tArray[i][j] != 0) {
                    new_row.unshift(tArray[i][j])
                }
            }
            console.log(new_row);

            let count = tArray[i].filter(el => el === 0).length; //０の個数
            for (let k = 0; k < count; k++) {
                new_row.unshift(0)
            }
            for (let l = new_row.length; l > 0; l--) {
                if (new_row[l] != 0 && new_row[l] == new_row[l - 1]) {
                    new_row[l] = new_row[l] * 2 //隣り合う２つのうち右側を倍にし、
                    new_row.splice(l - 1, 1) //左側を削除し、
                    new_row.unshift(0) //先頭に0を追加する
                    $('#score').html(parseInt($('#score').text()) + new_row[l] * 2) //スコアを加算
                }
            }
            new_array.push(new_row)
        }

        //再度転置
        new_array = transpose(new_array)
        console.log(new_array);

        if (this.change(new_array)) {
            //変化がある場合のみ１つ数字を増やす
            this.array = new_array
            this.generateNum()
        }

        //画面を更新
        this.displayArray()
    }

    right = () => {
        let new_array = []
        //まず各列を右詰めにし、右から隣合う数字が等しければ合計し、また右詰めにする
        for (let i = 0; i < this.array.length; i++) {
            let new_row = [] //右詰め後の配列
            for (let j = this.array[i].length - 1; j >= 0; j--) {
                if (this.array[i][j] != 0) {
                    new_row.unshift(this.array[i][j])
                }
            }
            console.log(new_row);

            let count = this.array[i].filter(el => el === 0).length; //０の個数
            for (let k = 0; k < count; k++) {
                new_row.unshift(0)
            }
            for (let l = new_row.length; l > 0; l--) {
                if (new_row[l] != 0 && new_row[l] == new_row[l - 1]) {
                    new_row[l] = new_row[l] * 2 //隣り合う２つのうち右側を倍にし、
                    new_row.splice(l - 1, 1) //左側を削除し、
                    new_row.unshift(0) //先頭に0を追加する
                    $('#score').html(parseInt($('#score').text()) + new_row[l]) //スコアを加算
                }
            }
            new_array.push(new_row)
        }
        console.log(new_array);

        if (this.change(new_array)) {
            //変化がある場合のみ１つ数字を増やす
            this.array = new_array
            this.generateNum()
        }

        //画面を更新
        this.displayArray()
    }

    //ボタンクリック前後で変化があるか判定
    change = (array) => {
        let count = 0
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i][j] != this.array[i][j]) {
                    count += 1
                }

            }
        }
        console.log(count);
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }
}

$("#up").hide();
$("#left").hide();
$("#down").hide();
$("#right").hide();

const start = () => {
    $("#up").show();
    $("#left").show();
    $("#down").show();
    $("#right").show();
    $('#start').text('RESET')
    const n = $('#n').val();
    const game = new Game(n);
    //初めは数字を２つ表示
    game.generateNum();
    game.generateNum();
    game.displayArray();

    $("#up").on('click', game.up) //function(){game.up()}でも可。game.up()とすると即時実行されてしまう。
    $("#left").on('click', game.left)
    $("#down").on('click', game.down)
    $("#right").on('click', game.right)
}