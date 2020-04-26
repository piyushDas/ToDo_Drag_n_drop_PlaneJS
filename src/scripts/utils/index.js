/*
  Checks useragent of the browser used to determine
  whether its a mobile device or desktop
*/
export const checkMobileDevice = () => {
    let returnVal = false
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)) {
        returnVal = true
    }
    return returnVal
}


export const segregateLists = list => {
  const data = {
    doing: [],
    pending: [],
    hold: []
  }
  if (list.length) {
    for (const task of list) {
      data[task.status].push(task)
    }
  }
  return data
}