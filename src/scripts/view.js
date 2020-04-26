import list from './Components/list.js'
/**
 * View component
 *
 * @param {string} id Selector to html component
 * @param {Object} data fetched from service
 */

const View = function (id, data) {

    function getIndexInList(list, max) {
      for (const item of list) {
        if (item.id > max) {
          max = item.id
        }
      }
      return max
    }

    function getInitialIndex () {
      let max = getIndexInList(data.pending, 0)
      max = getIndexInList(data.doing, max)
      max = getIndexInList(data.hold, max)
      console.log(max)
      return max
    }

    this.currentIndex = getInitialIndex()
    /**
     * Whenever new instance of View is created 
     * the first function to be invoked to intialize view
     * 
     * Invoked only once
     */
    this.bindTemplate = () => {
        document.getElementById(id).innerHTML = `
            <div class="flex flex-center">
              ${list(data.pending, 'pending')}
              ${list(data.hold, 'hold')}
              ${list(data.doing, 'doing')}
            </div> 
        `
        this.addDragDropEvents()
        this.addButtonBehaviour()
        this.listOptionBehaviour()
    }
    const thisView = this

    this.addButtonBehaviour = () => {
      const btns = document.getElementsByClassName('button')
      for (const btn of btns) {
        btn.addEventListener('click', e => {
          const key = e.currentTarget.id.split('-')[1]
          addItem(key)
        })
      }
    }

    this.listOptionBehaviour = () => {
      const editBtns = document.getElementsByClassName('edit')
      for (const btn of editBtns) {
        btn.addEventListener('click', e => {
          let text = e.currentTarget.parentNode.parentNode.innerText.split('Edit Remove')[0]
          document.getElementById(e.currentTarget.parentNode.parentNode.id).innerHTML = `
            <div class="flex flex-end">
              <input type="text" id="input-edit" />
              <button id="btn-edit" type="button" class="button primary-button">
                  Save
              </button>
            </div>
          `
          document.getElementById('input-edit').value = text.trim()
          document.getElementById('btn-edit').addEventListener('click', e => {
            const key = e.currentTarget.parentNode.parentNode.id.split('_')[1]
            const type = e.currentTarget.parentNode.parentNode.id.split('_')[0]
            const val = document.getElementById('input-edit').value
            editItem(key, type, val)
          })
          document.getElementById('input-edit').focus()
        })
      }

      const removeBtns = document.getElementsByClassName('remove')
      for (const btn of removeBtns) {
        btn.addEventListener('click', e => {
          const key = e.currentTarget.parentNode.parentNode.id.split('_')[1]
          const type = e.currentTarget.parentNode.parentNode.id.split('_')[0]
          removeItem(key, type)
        })
      }
    }

    this.updateList = (prev, next, id) => {
      let index = findItem(data[prev], parseInt(id))
      const del = data[prev].splice(index, 1)
      del[0].status = next
      data[next] = data[next].concat(del)
      console.log(data)
    }

    this.addDragDropEvents = () => {
        const els = document.querySelectorAll('.to-do-list-item');
        for (const el of els) {
            el.removeEventListener('dragstart', dragStart)
            el.addEventListener('dragstart', dragStart, false)
            el.removeEventListener('dragenter', dragEnter)
            el.addEventListener('dragenter', dragEnter, false)
            el.removeEventListener('dragover', dragOver)
            el.addEventListener('dragover', dragOver, false)
            el.removeEventListener('dragleave', dragLeave)
            el.addEventListener('dragleave', dragLeave, false)
            el.removeEventListener('drop', dragDrop)
            el.addEventListener('drop', dragDrop, false)
            el.removeEventListener('dragend', dragEnd)
            el.addEventListener('dragend', dragEnd, false)
        }
    }

    const addItem = key => {
      const dataObj = {}
      if (document.getElementById(`input-${key}`).value) {
        this.currentIndex += 1
        dataObj.id = this.currentIndex
        dataObj.title = document.getElementById(`input-${key}`).value
        document.getElementById(`input-${key}`).value = ''
        dataObj.status = key
        data[key].push(dataObj)
        console.log(data)
        this.bindTemplate()
      }
    }

    const findItem = (list, id) => {
      let index = ''
      for (const [idx, item] of list.entries()) {
        if (item.id === id) {
          index = idx
        }
      }
      return index
    }

    const editItem = (key, type, val) => {
      const list = data[type]
      let index = findItem(list, parseInt(key))
      list[index].title = val
      console.log(list)
      this.bindTemplate()
    }

    const removeItem = (key, type) => {
      const list = data[type]
      let index = findItem(list, parseInt(key))
      list.splice(index, 1)
      this.bindTemplate()
    }

    let dragSrcEl
    function dragStart(e) {
      e.currentTarget.style.opacity = '0.4';
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    };
      
    function dragEnter(e) {
      this.classList.add('over');
    }
    
    function dragLeave(e) {
      e.stopPropagation();
      this.classList.remove('over');
    }
    
    function dragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    }
    
    function dragDrop(e) {
      if (dragSrcEl != this) {
        dragSrcEl.parentNode.removeChild(dragSrcEl)
        var li  = document.createElement("li");
        this.parentNode.insertBefore(li, this.nextSibling)
        li.classList.add('to-do-list-item')
        li.innerHTML = e.dataTransfer.getData('text/html')
        li.setAttribute('draggable', true)
        const id = `${this.id.split('_')[0]}_${dragSrcEl.id.split('_')[1]}`
        li.setAttribute('id', id)
        thisView.updateList(dragSrcEl.id.split('_')[0], this.id.split('_')[0], dragSrcEl.id.split('_')[1])
      }
      thisView.addDragDropEvents()
      return false
    }
    
    function dragEnd(e) {
      var listItens = document.querySelectorAll('.to-do-list-item');
      [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
      });
      this.style.opacity = '1';
    }
}

export default View