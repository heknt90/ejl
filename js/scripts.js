// Получаем данные

document.getElementById("excel-raw").addEventListener("paste", onTextareaPasteEventHandler)

// Обработчик вставки текста
function onTextareaPasteEventHandler(event) {
    const specials = ["\t"]
    const emptyList = ["\n", "\r", "x", "х", "X", "Х"]

    const data = event.clipboardData.getData("text/plain")

    let newData = stringToArray(data)
    console.log(111, newData)
    newData = normalizeNextLineOperator(newData)
    newData = parseArray(newData)
    console.log(222, newData)
    newData = getValues(newData)
    console.log(333, newData)

    console.log(newData)

    function stringToArray(string) {
        let result = []
        for (let item of string) {
            result.push(item)
        }
        return result
    }

    function parseArray(data) {
        let result = []
        let sym = ""
        for (let item of data) {
            if (["\r\n", "\t"].includes(item)) {
                result.push(sym)
                sym = ""
            } else {
                sym += item
            }
        }
        return result
    }

    function normalizeNextLineOperator(string) {
        let result = []
        for (let item of data) {
            if (item === "\r") {
                // Пропускаем
            } else if (item === "\n") {
                result.push("\r\n")
            } else {
                result.push(item)
            }
        }
        return result
    }

    function isSpecial(string) {
        return specials.includes(string)
    }

    function isEmpty(string) {
        return emptyList.includes(string)
    }

    function getValues(data) {
        return data
                .filter(item => (item === "" || parseFloat(item)))
                .map(item => (item.includes(",")) ? Array.from(item).map(i => (i==="," ? "." : i)).join("") : item)
                .map(item => (item !== "") ? parseFloat(item) : "" )
    }

    function getMeta() {

    }
}

// Добавить функции 1) получения числовых данных 2) получение массива численных значений


// Далее нужна будет страница и функция составления из данных таблицы, данные из которой можно будет скопировать в исходную таблицу в excel

// В дальнейшем нужна будет функция поиска праздничных и выходных дней для одного человека
// функция составления табеля вредности из исходной табеля учета рабочего времени для одного человека