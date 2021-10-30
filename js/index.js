document.addEventListener('DOMContentLoaded', () => {
  
  //  --> constants <-- //
  const monsterContainer = document.querySelector('#monster-container');
  const monsterForm = document.querySelector('#create-monster form');
  const backBtn = document.querySelector('#back');
  const forwardBtn = document.querySelector('#forward');

  const url = "http://localhost:3000/monsters"

  let pageNum = 1;

  // --> functions <-- //
  const getMonsterData = async (limit, page = pageNum) => {
    const data = await (await fetch(url + `/?_limit=${limit}&_page=${page}`)).json();
    const divs = [];
    data.forEach(monster => {
      const {name, age, description} = monster;
      const div = document.createElement('DIV');
      div.classList.add("monster");
      const html = `
      <h1>${name}</h1>
      <p>${age}</p>
      <p>${description}</p>
      `;
      div.innerHTML = html;
      divs.push(div);
    })
    monsterContainer.innerHTML = ""
    monsterContainer.append(...divs);
  }

  // --> event listeners <-- //
  monsterForm.addEventListener('submit', e => {
    console.log(e)
    // debugger;
    e.preventDefault();
    // const  [ {value: name}, {value: age}, {value: description} ] = monsterForm;
    const name = monsterForm.querySelector('#nameInput').value
    const age = monsterForm.querySelector('#ageInput').value || "unknown"
    const description = monsterForm.querySelector('#descriptionInput').value
    // console.log(name, age, description);
    const options = {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name, age, description})
    }
    
    fetch(url, options)
      .then(res => {
        if (!res.ok) console.error(res.status)
        else console.log("posted");
    })
      .catch(err => {throw new Error(err)})

  })

  backBtn.addEventListener('click', () => {
    pageNum--;
    if (pageNum < 1) {
      pageNum = 1;
    } else {
      getMonsterData(50, pageNum)
    }
  })

  forwardBtn.addEventListener('click', () => getMonsterData(50, ++pageNum));


  getMonsterData(50, 1);
})