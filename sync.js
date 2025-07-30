const token = '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';  // ← Thay token thật của bạn vào đây
const username = 'Ganang1312';
const repo = 'DMX-Savico-Dashboard';
const path = 'data.json';
const branch = 'main';

async function saveToGitHub(content) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

  const getRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    }
  });
  const getData = await getRes.json();
  const sha = getData.sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      message: "Cập nhật từ dashboard",
      content: btoa(unescape(encodeURIComponent(JSON.stringify({ dulieu: content })))),
      sha: sha,
      branch: branch
    })
  });

  if (res.ok) alert("✅ Đã lưu dữ liệu!");
  else alert("❌ Lỗi khi lưu!");
}

async function loadFromGitHub() {
  const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${path}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const textarea = document.getElementById('textareaData');
    if (textarea) textarea.value = data.dulieu || '';
  } catch (e) {
    console.error("Không thể tải dữ liệu:", e);
  }
}

window.onload = () => {
  loadFromGitHub();

  const btn = document.getElementById('btnSave');
  if (btn) {
    btn.onclick = () => {
      const value = document.getElementById('textareaData').value;
      saveToGitHub(value);
    };
  }
};
