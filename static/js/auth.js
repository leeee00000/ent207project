document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('authModal');
  const loginBtn = document.getElementById('loginBtn');
  const closeBtn = document.getElementById('closeModal');
  const userTag = document.getElementById('userTag');
  // 初始化检查登录状态
  function updateAuthUI() {
    const savedUser = localStorage.getItem('fuxi_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (userTag) {
        userTag.innerHTML = `👤 ${user.name} <span style="font-size:10px;opacity:0.8;">(${user.role})</span>`;
      }
      if (loginBtn) {
        loginBtn.innerText = '切换/退出';
      }
    } else {
      if (userTag) userTag.innerHTML = '🏢 未登录访客';
      if (loginBtn) loginBtn.innerText = '登录/注册';
    }
  }
  window.openModal = () => { if (modal) modal.style.display = 'flex'; };
  window.closeModal = () => { if (modal) modal.style.display = 'none'; };
  if (loginBtn) loginBtn.onclick = window.openModal;
  if (closeBtn) closeBtn.onclick = window.closeModal;
  if (modal) {
    modal.onclick = (e) => { if (e.target === modal) window.closeModal(); };
  }
  // 快捷体验角色切换（Demo 演示专用）
  window.setQuickRole = (role, name) => {
    const user = { role, name, time: new Date().toLocaleTimeString() };
    localStorage.setItem('fuxi_user', JSON.stringify(user));
    updateAuthUI();
    window.closeModal();
    alert(`已为您快速切换为：【${name}（${role}）】`);
  };
  window.handleManualAuth = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (!username) return alert('请输入用户名');
    setQuickRole('标准管家', username);
  };
  updateAuthUI();
});
