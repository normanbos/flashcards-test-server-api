const inputId = get('#id')
const inputQuestion = get('#question')
const inputAnswer = get('#answer')

const buttonRead = get('[data-js="read"]')
const buttonCreate = get('[data-js="create"]')
const buttonUpdate = get('[data-js="update"]')
const buttonDelete = get('[data-js="delete"]')

buttonRead.addEventListener('click', () => getCards())
function getCards(id = '') {
  console.clear()
  fetchCard({ id })
}

buttonCreate.addEventListener('click', () => {
  postCard({ question: inputQuestion.value, answer: inputAnswer.value })
  inputAnswer.value = ''
  inputQuestion.value = ''
})

function postCard(data) {
  fetchCard({ data, method: 'POST' })
}

buttonUpdate.addEventListener('click', () =>
  patchCard(inputId.value, {
    question: inputQuestion.value,
    answer: inputAnswer.value,
  })
)

function patchCard(id, data) {
  fetchCard({ id, data, method: 'PATCH' })
}

buttonDelete.addEventListener('click', () => deleteCard(inputId.value))

function deleteCard(id) {
  fetchCard({ id, method: 'DELETE' })
}

function fetchCard({ id = '', method = 'GET', data }) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  fetch('http://localhost:3334/cards/' + id, config)
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

function renderCards(cards) {
  console.log(cards)
  // render cards in body
}

function get(selector, target = document) {
  return target.querySelector(selector)
}

function getAll(selector, target = document) {
  return target.querySelectorAll(selector)
}
