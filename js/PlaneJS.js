export function initialize() {

    // 当画面で使用するすべての入力項目
    const allInputs = document.querySelectorAll("#MyUserTable input");
    // 当画面で使用するすべてのボタン
    const allButtons = document.querySelectorAll("#MyUserTable button");


    // IDの[idx]の指標を返す
    const getIndexFromID = (id) => {
        return id.match(/\[\d+\]/g).toString().replace(/\[|\]/g, "");
    };

    // 入力に伴う画面状態チェンジ
    const modeChange = (e) => {

        const thisIdx = getIndexFromID(e.target.id);

        // 入力行の登録・キャンセルボタンを表示
        const buttons = document.querySelectorAll(`#MyUserTable button[id *= '[${thisIdx}]']`);
        buttons.forEach((button) => {
            button.removeAttribute("disabled");
        });

        // 全inputのイベント削除
        allInputs.forEach((input) => {
            input.removeEventListener("input", modeChange);

            // 入力行以外無効化
            let idx = getIndexFromID(input.id);
            if (idx != thisIdx) {
                input.setAttribute("readonly", "readonly");
            }
        });
    }

    // inputすべてを入力待ち受け状態にする
    // イベントリスナーのobjで指標を渡すとobjのインスタンス管理が煩雑なので
    // ModeChange内で正規表現で指標を取得している
    allInputs.forEach((input) => {
        input.addEventListener("input", modeChange);
        input.removeAttribute("readonly");
    });

    // ボタン全て無効化
    allButtons.forEach((button) => {
        button.setAttribute("disabled","disabled");
    });
}
