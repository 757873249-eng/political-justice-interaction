const screens = [...document.querySelectorAll('.screen')];
const stepLabel = document.querySelector('#stepLabel');
const continueButton = document.querySelector('#continueButton');
let selected = null;

const details = {
  education: {
    name: '公平机会',
    copy: '你关注的是起点条件。教育投入不是简单地把资源分成相等的份额，而是让不同处境的人拥有更真实的发展机会。',
    theories: ['罗尔斯：公平机会', '孟子：使民以时'],
    challenge: '如果教育投入需要多年才能见效，而医疗需求正在发生，你仍然坚持这个选择吗？'
  },
  medical: {
    name: '基本需要',
    copy: '你关注的是人的基本生活与尊严。对正在承受现实风险的人，公共权力是否有优先救助的责任？',
    theories: ['孟子：保民', '亚里士多德：共同生活'],
    challenge: '如果医疗服务主要惠及一部分人，而交通改善能让全县更多人受益，你如何说明优先顺序？'
  },
  relief: {
    name: '最不利者优先',
    copy: '你关注的是制度结果对弱势群体的影响。总体水平提高，并不能自动证明处于最不利位置的人得到了公平对待。',
    theories: ['罗尔斯：差别原则', '孟子：民为贵'],
    challenge: '如果救助只能暂时缓解困难，却没有改善教育和就业机会，这种正义是否足够？'
  },
  transport: {
    name: '公共效益',
    copy: '你关注的是公共资源的覆盖范围和整体效果。一个选择如果能让更多人受益，是否就应当获得优先？',
    theories: ['亚里士多德：共同利益', '功利主义：总体效用'],
    challenge: '如果交通线路主要服务人口密集地区，偏远村庄仍然无法到达，你还会以总人数作为主要标准吗？'
  }
};

function showScreen(number) {
  screens.forEach(screen => screen.classList.toggle('active', screen.dataset.screen === String(number)));
  stepLabel.textContent = `${String(Math.min(number, 3)).padStart(2, '0')} / 03`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-next]').forEach(button => {
  button.addEventListener('click', () => {
    const next = Number(button.dataset.next);
    if (next === 3 && selected) {
      const detail = details[selected];
      document.querySelector('#standardName').textContent = detail.name;
      document.querySelector('#standardCopy').textContent = detail.copy;
      document.querySelector('#challengeText').textContent = detail.challenge;
      document.querySelector('#theoryLinks').innerHTML = detail.theories.map(item => `<span>${item}</span>`).join('');
    }
    showScreen(next);
  });
});

document.querySelectorAll('.choice').forEach(choice => {
  choice.addEventListener('click', () => {
    selected = choice.dataset.choice;
    document.querySelectorAll('.choice').forEach(item => {
      const isSelected = item === choice;
      item.classList.toggle('selected', isSelected);
      item.setAttribute('aria-checked', String(isSelected));
    });
    continueButton.disabled = false;
  });
});

document.querySelector('#restartButton').addEventListener('click', () => {
  selected = null;
  continueButton.disabled = true;
  document.querySelectorAll('.choice').forEach(choice => {
    choice.classList.remove('selected');
    choice.setAttribute('aria-checked', 'false');
  });
  showScreen(1);
});
