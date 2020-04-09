describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://localhost:8080/MyTDL.html');
    });
  
    after (async function () {
      // await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('MyTDL');
    })

    it('test add', async function(){
      await page.type('#tag','new todo item',{dalay:2000});
      await page.click('#addBtn',{delay:2000});
      let todoList = await page.waitFor('#cont');
      let realText = await page.evaluate(function(todoList){
        return todoList.lastChild.textContent;
      },todoList);
      expect(realText).to.eql('new todo item');
    })

    it('test complete', async function(){
      await page.click('#comBtn',{delay:2000});
      let todoList = await page.waitFor('#compl');
      let realText = await page.evaluate(function(todoList){
        return todoList.lastChild.textContent;
      },todoList);
      expect(realText).to.eql('已完成');
    })

    // it('should new todo correct', async function() {
    //   await page.click('#new-todo', {delay: 500});
    //   await page.type('#new-todo', 'new todo item', {delay: 50});
    //   await page.keyboard.press("Enter");
    //   let todoList = await page.waitFor('#todo-list');
    //   const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
    //   expect(expectInputContent).to.eql('new todo item');
    // }) 
  });