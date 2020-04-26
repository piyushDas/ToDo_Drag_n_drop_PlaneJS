import listItem from './listItem.js'

const list = (data, type) => {
    let listContent = ''
    for (const item of data) {
        listContent += listItem(item, type)
    }
    let template = `
        <div class="list ${type}">
            <div class="list-header">
                ${type}
            </div>
            <ul class="">${listContent}</ul>
            <div class="flex flex-end">
                <input type="text" id="input-${type}" />
            </div>
            <div class="flex flex-end">
                <button id="btn-${type}" type="button" class="button primary-button">
                    Add
                </button>
            </div>
        </div>`
    return template
}

export default list