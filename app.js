// HTML'deki input ve tag container elemanlarını seçiyoruz
const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

// Textarea'ya odaklanıyoruz
textarea.focus()

// Textarea'da bir tuşa basıldığında bu fonksiyonu çağırıyoruz
textarea.addEventListener('keyup', (e) => {
  // Girilen değeri kullanarak etiketleri oluşturuyoruz
  createTags(e.target.value)

  // Eğer Enter tuşuna basıldıysa
  if (e.key === 'Enter') {
    // Yazılan değeri temizleme işlemini biraz bekletiyoruz
    setTimeout(() => {
      e.target.value = ''
    }, 10)

    // Rasgele bir etiketi seçiyoruz ve vurgulama işlemini başlatıyoruz
    randomSelect()
  }
})

// Girilen değeri kullanarak etiketleri oluşturan fonksiyon
function createTags(input) {
  // Giriş değerini virgüllerle ayırıp boşlukları temizliyoruz
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim())

  // Tag container'ını temizliyoruz
  tagsEl.innerHTML = ''

  // Her bir etiket için bir span oluşturup container'a ekliyoruz
  tags.forEach((tag) => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag')
    tagEl.innerHTML = tag
    tagsEl.appendChild(tagEl)
  })
}

// Etiketleri rasgele seçip vurgulayan fonksiyon
function randomSelect() {
  // Belirli bir süre boyunca etiketleri rasgele seçip vurguluyoruz
  const times = 30
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()
    highlightTag(randomTag)
    setTimeout(() => {
      unHighLight(randomTag)
    }, 100)
  }, 100)

  // Belirtilen süre sonunda vurgulamayı durdurup, son bir etiketi vurguluyoruz
  setTimeout(() => {
    clearInterval(interval)
    setTimeout(() => {
      const randomTag = pickRandomTag()
      highlightTag(randomTag)
    }, 100)
  }, times * 100)
}

// Belirtilen süre boyunca rasgele bir etiketi seçen fonksiyon
function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

// Bir etiketi vurgulayan fonksiyon
function highlightTag(tag) {
  tag.classList.add('highlight')
}

// Bir etiketin vurgusunu kaldıran fonksiyon
function unHighLight(tag) {
  tag.classList.remove('highlight')
}