let xhr = new XMLHttpRequest()
xhr.open('GET', 'https://dog.ceo/api/breeds/image/random', true)
xhr.onreadystatechange = function() {
    if(this.readyState !== 4) return
    if(this.status === 200){
        handle(this.response)
    }else{
        console.error(this.statusText)
    }
}
xhr.onerror = function() {
    console.error(this.statusText)
}


function myAjax(url){
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET',url,true)
        xhr.onreadystatechange = function(){
            if(this.readyState !== 4) return
            if(this.status === 200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function(){
            reject(new Error(this.statusText))
        }
        xhr.send()
    })
}
myAjax('https://dog.ceo/api/breeds/image/random').then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})