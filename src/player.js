document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('playerContainer');
  const expanded = document.getElementById('expandedPlayer');
  const minimized = document.getElementById('minimizedPlayer');
  const hideBtn = document.getElementById('hidePlayerBtn');
  const showBtn = document.getElementById('showPlayerBtn');
  const audio = document.getElementById('audioPlayer');
  const playerButtons = document.querySelectorAll('.player-btn');
  const miniSongName = document.getElementById('miniSongName');
  const miniPlayPause = document.getElementById('miniPlayPause');
  const miniPrev = document.getElementById('miniPrev');
  const miniNext = document.getElementById('miniNext');

  let isDragging = false;
  let offsetX, offsetY;
  let isPlaying = false;

  audio.controls = true;

  const tracks = [
    { src: './music.mp3', name: 'breakcore' }
  ];
  let currentTrackIndex = 0;

  function loadTrack(index) {
    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;
    currentTrackIndex = index;
    audio.src = tracks[index].src;
    miniSongName.textContent = tracks[index].name;
    audio.play().catch(() => {});
  }
  loadTrack(0);

  playerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const name = btn.getAttribute('data-name');
      const trackIndex = tracks.findIndex(t => t.src === src);
      if (trackIndex !== -1) {
        currentTrackIndex = trackIndex;
        loadTrack(currentTrackIndex);
      } else {
        audio.src = src;
        miniSongName.textContent = name;
      }
      audio.play();
      isPlaying = true;
      miniPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
    });
  });

  miniPlayPause.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      miniPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
      isPlaying = true;
    } else {
      audio.pause();
      miniPlayPause.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
    }
  });

  miniPrev.addEventListener('click', () => {
    loadTrack(currentTrackIndex - 1);
    if (isPlaying) audio.play();
  });

  miniNext.addEventListener('click', () => {
    loadTrack(currentTrackIndex + 1);
    if (isPlaying) audio.play();
  });

  audio.addEventListener('play', () => {
    isPlaying = true;
    miniPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    miniPlayPause.innerHTML = '<i class="fas fa-play"></i>';
  });

  hideBtn.addEventListener('click', () => {
    expanded.style.display = 'none';
    minimized.style.display = 'block';
  });

  showBtn.addEventListener('click', () => {
    minimized.style.display = 'none';
    expanded.style.display = 'block';
  });

  const dragHandleExpanded = document.getElementById('dragHandle');
  const dragHandleMinimized = document.getElementById('miniDragHandle');

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    const rect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    container.style.cursor = 'grabbing';
  }

  function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    left = Math.max(0, Math.min(left, winWidth - containerWidth));
    top = Math.max(0, Math.min(top, winHeight - containerHeight));
    container.style.left = left + 'px';
    container.style.top = top + 'px';
  }

  function stopDrag() {
    isDragging = false;
    container.style.cursor = 'move';
  }

  [dragHandleExpanded, dragHandleMinimized].forEach(handle => {
    if (handle) handle.addEventListener('mousedown', startDrag);
  });

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);

  container.style.transform = 'none';
  if (window.innerWidth <= 768) {
    container.style.right = '10px';
    container.style.left = 'auto';
    container.style.top = 'auto';
    container.style.bottom = '90px';
  } else {
    container.style.right = '20px';
    container.style.left = 'auto';
    container.style.top = (window.innerHeight / 2 - container.offsetHeight / 2) + 'px';
  }

  window.addEventListener('resize', () => {
    const rect = container.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    let left = rect.left;
    let top = rect.top;
    if (left + rect.width > winWidth) left = winWidth - rect.width;
    if (top + rect.height > winHeight) top = winHeight - rect.height;
    left = Math.max(0, left);
    top = Math.max(0, top);
    container.style.left = left + 'px';
    container.style.top = top + 'px';
  });
});