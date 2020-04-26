// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';
import Service from './service.js'
import View from './view.js'
import { segregateLists } from './utils'


/**
 * App initializer
 *
 * async function fetches data from service
 * passes on to nested components
 */
const initiateApp = async () => {
    const dataSet = new Service()
    let tasks = await dataSet.getData()
    const view = new View('root', segregateLists(tasks))
    view.bindTemplate()
}

initiateApp()