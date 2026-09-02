let audioCtx = null;
const initAudio = () => {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {}
};
const playChime = () => {
    if (!audioCtx) return;
    try {
        const now = audioCtx.currentTime;
        [[880, 0], [1318.51, 0.1]].forEach(([f, t]) => {
            const osc = audioCtx.createOscillator(), g = audioCtx.createGain();
            osc.connect(g); g.connect(audioCtx.destination);
            osc.type = 'sine'; osc.frequency.value = f;
            g.gain.setValueAtTime(0, now + t);
            g.gain.linearRampToValueAtTime(0.18, now + t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.001, now + t + 0.45);
            osc.start(now + t); osc.stop(now + t + 0.5);
        });
    } catch (e) {}
};

export { initAudio, playChime };
