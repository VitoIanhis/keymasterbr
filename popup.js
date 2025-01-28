document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const passwordDisplay = document.getElementById('password');
  const lengthInput = document.getElementById('length');
  const minusBtn = document.querySelector('.number-button.minus');
  const plusBtn = document.querySelector('.number-button.plus');
  
  const getOptions = () => ({
    length: parseInt(lengthInput.value),
    uppercase: document.getElementById('uppercase').checked,
    lowercase: document.getElementById('lowercase').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked
  });

  const updateLength = (newValue) => {
    const value = Math.min(Math.max(newValue, 4), 128);
    lengthInput.value = value;
  };

  minusBtn.addEventListener('click', () => {
    updateLength(parseInt(lengthInput.value) - 1);
  });

  plusBtn.addEventListener('click', () => {
    updateLength(parseInt(lengthInput.value) + 1);
  });

  lengthInput.addEventListener('change', () => {
    updateLength(parseInt(lengthInput.value));
  });

  const generatePassword = (options) => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercaseChars;
    if (options.lowercase) chars += lowercaseChars;
    if (options.numbers) chars += numberChars;
    if (options.symbols) chars += symbolChars;

    if (chars === '') {
      alert('Selecione pelo menos um tipo de caractere');
      return '';
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    const finalPassword = Array.from(password);
    if (options.uppercase) {
      finalPassword[0] = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (options.lowercase) {
      finalPassword[1] = lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    if (options.numbers) {
      finalPassword[2] = numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (options.symbols) {
      finalPassword[3] = symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    for (let i = finalPassword.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [finalPassword[i], finalPassword[j]] = [finalPassword[j], finalPassword[i]];
    }

    return finalPassword.join('');
  };

  generateBtn.addEventListener('click', () => {
    const options = getOptions();
    if (options.length < 4 || options.length > 50) {
      alert('O tamanho da sua senha deve estar entre 4 e 50 caracteres');
      return;
    }
    const password = generatePassword(options);
    passwordDisplay.textContent = password;
  });

  copyBtn.addEventListener('click', async () => {
    const password = passwordDisplay.textContent;
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copiado!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 1500);
    } catch (err) {
      console.error('Falha ao copiar a senha para a área de transferência:', err);
    }
  });
  generateBtn.click();
});