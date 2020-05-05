agenda = [
  {
    title: 'Lease Discussion',
    body: 'We are going to talk about how the lease.',
    timer: 0,
    link: 'https://docs.google.com/document/d/1AjVDGt3SskIA8eYE3VbxfjxqbraahVdDtjJValxRzMk/edit?usp=sharing'
  },
  {
    title: 'Wrench Club Values',
    body: 'What values do we have, what do we want to be, and how do we achieve that?',
    timer: 0,
    link: 'https://docs.google.com/document/d/1uuUIomIbcln1UB5Zlu9p20_5tAOAClvsMrpj4yFmiFE/edit?usp=sharing'
  }
]

endTime = new Date('May 5, 2020 21:00:00').getTime();
hour = 36000000 //seconds
activeItem = null;

const t_main = document.getElementById('t_main')
const t_item = document.getElementById('t_item')
const agendaList = document.getElementById('agendaList')
let items = document.getElementsByClassName('item')
const content = document.getElementById('content')
const iframe = document.getElementById('iframe')
const onTableTitle = document.getElementById('onTableTitle')

function addItem(t, b) {
  console.log(agendaList.children)
  let num = 0;
  if (agendaList.children === undefined || agendaList.children == 0) {
    num = 0;
  } else {
    num = agendaList.children.length;
  }

  let newItem = document.createElement('div')
  newItem.setAttribute('onclick', `setActive(event, ${num})`)
  newItem.setAttribute('class', 'item')
  let title = document.createElement('div')
  title.setAttribute('class', 'itemText')
  title.innerHTML = t;
  let txt = document.createElement('div')
  txt.setAttribute('class', 'itemContent')
  txt.innerHTML = b

  agendaList.appendChild(newItem)
  newItem.appendChild(title)
  newItem.appendChild(txt)

}

function delItem (x) {
  agendaList.children[x].remove()
}

function setActive(event, x) {

  for (i=0; i < agendaList.children.length; i++) {
    agendaList.children[i].setAttribute('class', 'item')
  }
  agendaList.children[x].setAttribute('class', 'item active')

  iframe.setAttribute('src', agenda[x].link)
  onTableTitle.innerHTML = agenda[x].title
  activeItem = x;
}

function startMainClock() {
  
}

function update() {
  hour = hour - 1000;
  now = new Date().getTime()
  
  let distance = endTime - now;
  console.log(now)
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (seconds < 10) { seconds = '0' + seconds}
  t_main.innerHTML = hours + ":" + minutes + ":" + seconds;

  if (activeItem != null) {
    agenda[activeItem].timer += 1000

    let m = Math.floor((agenda[activeItem].timer % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((agenda[activeItem].timer % (1000 * 60)) / 1000);

    if (s < 10) { s = '0' + s}

    t_item.innerHTML = m + ":" + s;
  } else {
    t_item.innerHTML = ''
  }
  

}


agenda.forEach(d => addItem(d.title, d.body))
setActive(event, 0)

let clock = setInterval(update, 1000);


