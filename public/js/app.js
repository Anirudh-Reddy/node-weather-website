const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
const location = search.value
const m1 = document.querySelector('#p1')
m1.textContent = 'Loading...'
fetch('http://localhost:3000/weather?address='+location).then(res=>{
    res.json().then(data=>{
        if(data.error){
            console.log('error occured',data)
            m1.textContent = data.error
        }else{
            console.log(data.location)
            m1.textContent = data.location
            search.textContent = ''
        }
    })

})
})


