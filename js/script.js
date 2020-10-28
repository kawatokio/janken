// グローバル変数宣言
var janken_cnt = 0;
var janken_id = null ;
var janken_cpunum 

//====== 0.3秒間インターバルタイマー起動ルーチン ======
function StartJankenGame() {
    if(janken_id == null){  // まだタイマー起動していない時のみ有効
        document.getElementById("janken_message1").innerHTML = "相手の手: なにかな？";
        document.getElementById("janken_message2").innerHTML = "結果: どうなるかな？";

        // ボタンとセレクトボックスの操作を禁止
        document.getElementById("janken_button").disabled = "disabled"
        document.getElementById("janken_select").disabled = "disabled"

        // 0.3秒間インターバルタイマーをセット
        janken_id = setInterval(function(){myJankenGame();}, 300);

        janken_cnt = 0; // ジャンケン処理工程カウンタをリセット
    }
}

//====== ジャンケン処理ルーチン ======
// (インターバルタイマーによって0.3秒毎に呼ばれる）
function myJankenGame() {
    var cpuhand;
    var judge_txt;
   
    // セレクトボックスからユーザーの出し手を取得
    var myte = document.getElementById("janken_select").selectedIndex;

    if (janken_cnt == 1){ // 相手の出し手設定処理
        janken_cpunum = Math.floor(Math.random() * 3); // 0～2の乱数を作る
        // 乱数値に応じて相手の出し手を割り当てる
        if(janken_cpunum == 0) {
            cpuhand = "ぐー";
        } else if(janken_cpunum == 1) {
            cpuhand = "ちょき";
        } else {
            cpuhand = "ぱー";
        }
        // 出し手に応じてテキストを設定
        document.getElementById("janken_message1").innerHTML = "相手の手: " + cpuhand;
    }
    else if (janken_cnt > 2){ // じゃんけん勝負結果判定処理
        if ((myte == 0 && janken_cpunum == 1) || (myte == 1 && janken_cpunum == 2) || (myte == 2 && janken_cpunum == 0)){
            judge_txt = "あなたの勝ち";
        } else if(myte == janken_cpunum) {
            judge_txt = "ひきわけ";
        } else {
            judge_txt = "あなたの負け";
        }
        // 判定結果に応じてテキストを設定
        document.getElementById("janken_message2").innerHTML = "結果: " + judge_txt;


        clearInterval(janken_id);   // インターバルタイマーをリセット
        janken_id = null;           // タイマーID値をクリア
 
       // ボタンとセレクトボックスの操作を有効にする
        document.getElementById("janken_button").disabled = "";
        document.getElementById("janken_button").style.background = 'ButtonFace';
        document.getElementById("janken_select").disabled = "";
    }
    janken_cnt++; // ジャンケン処理工程を進める
}