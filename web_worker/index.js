
let worker = new Worker('/web_worker/worker.js');

const [btn1, btn2, btn3] = document.querySelectorAll('.btn');

btn1.addEventListener('click', () => {
  const taskResult = heavyTask(1);
  console.log('button 1 clicked');
  console.log('Result from main thread', taskResult);
});

btn2.addEventListener('click', () => {
  worker.postMessage({ taskId: 2 });
  console.log('button 2 clicked');
});

btn3.addEventListener('click', () => {
  worker.postMessage({ taskId: 3 });
  console.log('button 3 clicked');
});

worker.addEventListener('message', (ev) => {
  console.log('Result from worker', ev.data);
});

function delay(ms) {
  const startPoint = new Date().getTime();
  while (new Date().getTime() - startPoint <= ms) {
    // simulating a heavy task
  }
}

function heavyTask(taskId) {
  const result = 100 + taskId;
  const startTime = new Date().getTime();
  delay(2000);
  const totalTime = new Date().getTime() - startTime;
  console.log(`Main thread completed task ${taskId} in ${totalTime}ms`);
  return result;
}
