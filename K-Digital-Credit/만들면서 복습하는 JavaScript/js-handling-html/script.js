var crudApp = new (function () {
  // 수강 데이터를 담을 JSON 형식의 배열 만들기
  this.myClass = [
    { ID: "1", Class_Name: "운영체제", Category: "전공필수", Credit: 3 },
    { ID: "2", Class_Name: "컴퓨터구조론", Category: "전공선택", Credit: 4 },
    { ID: "3", Class_Name: "심리학의 이해", Category: "교양필수", Credit: 2 },
  ];

  // 선택할 수 있는 항목 미리 정의
  this.Category = ["전공필수", "전공선택", "교양필수", "교양선택"];

  // Table Header에 담길 데이터를 확장성을 위해 비어있는 배열에 담기
  this.col = [];

  //  데이터 끝

  // 위의 데이터를 토대로 실제로 테이블을 만드는 메서드
  this.createTalbe = () => {
    // 테이블을 만들고, 데이터를 채우는 코드
    // col에 table header에 해당하는 데이터(myClass의 key값들)들을 넣어주는 코드
    for (var i = 0; i < this.myClass.length; i++) {
      for (var key in this.myClass[i]) {
        if (this.col.indexOf(key) === -1) this.col.push(key);
      }
    }

    var table = document.createElement("table");
    table.setAttribute("id", "classTable");
    var tr = table.insertRow(-1);

    for (var h = 0; h < this.col.length; h++) {
      var th = document.createElement("th");
      th.innerHTML = this.col[h];
      tr.appendChild(th);
    }

    for (var i = 0; i < this.myClass.length; i++) {
      tr = table.insertRow(-1);
      for (var j = 0; j < this.col.length; j++) {
        var tableCell = tr.insertCell();
        tableCell.innerHTML = this.myClass[i][this.col[j]];
      }

      // 버튼 만들기
      // 업데이트 버튼 만들기
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btnUpdate = document.createElement("input");
      btnUpdate.setAttribute("type", "button");
      btnUpdate.setAttribute("value", "Update");
      btnUpdate.setAttribute("id", `Edit${i}`);
      btnUpdate.setAttribute("style", "background-color: #44cceb");
      btnUpdate.setAttribute("onclick", "crudApp.Update(this)");
      this.td.appendChild(btnUpdate);

      // 세이브 버튼 만들기
      tr.appendChild(this.td);
      var btnSave = document.createElement("input");
      btnSave.setAttribute("type", "button");
      btnSave.setAttribute("value", "Save");
      btnSave.setAttribute("id", `Save${i}`);
      btnSave.setAttribute("style", "display: none");
      btnSave.setAttribute("onclick", "crudApp.Save(this)");
      this.td.appendChild(btnSave);

      // Delete 버튼 만들기
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btnDelete = document.createElement("input");
      btnDelete.setAttribute("type", "button");
      btnDelete.setAttribute("value", "Delete");
      btnDelete.setAttribute("id", `Delete${i}`);
      btnDelete.setAttribute("style", "background-color: #ed5650");
      btnDelete.setAttribute("onclick", "crudApp.Delete(this)");
      this.td.appendChild(btnDelete);
    }

    tr = table.insertRow(-1);
    for (var j = 0; j < this.col.length; j++) {
      var newCell = tr.insertCell(-1);
      if (j >= 1) {
        if (j === 2) {
          // category를 선택 항목으로 만들기
          var select = document.createElement("select");
          select.innerHTML = `<option value=""></option>`;

          //선택 항목 만들기
          for (var k = 0; k < this.Category.length; k++) {
            select.innerHTML =
              select.innerHTML +
              `<option value="${this.Category[k]}">${this.Category[k]}</option>"`;
          }
          newCell.appendChild(select);
        } else {
          var textBox = document.createElement("input");
          textBox.setAttribute("type", "text");
          textBox.setAttribute("value", "");
          newCell.appendChild(textBox);
        }
      }
    }

    // Create 버튼 만들기
    this.td = document.createElement("td");
    tr.appendChild(this.td);
    var btnCreate = document.createElement("input");
    btnCreate.setAttribute("type", "button");
    btnCreate.setAttribute("value", "Create");
    btnCreate.setAttribute("id", `New${i}`);
    btnCreate.setAttribute("style", "background-color: #207dd1");
    btnCreate.setAttribute("onclick", "crudApp.CreateNew(this)");
    this.td.appendChild(btnCreate);

    var div = document.getElementById("container");
    div.innerHTML = "수강관리 앱";
    div.appendChild(table);
  };
})();

crudApp.createTalbe();
