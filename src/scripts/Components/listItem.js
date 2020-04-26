const listItem = (item, type) => {
    const { id, title} = item
    let template = `
        <li class="to-do-list-item" id="${type}_${id}" draggable="true">
            ${title}
            <div>
                <span class="list-opts edit">Edit</span>
                <span class="list-opts remove">Remove</span>
            </div>
        </li>`
    return template
}

export default listItem