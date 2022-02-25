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

    var div = document.getElementById("container");
    div.innerHTML = "수강관리 앱";
    div.appendChild(table);
  };
})();

crudApp.createTalbe();
