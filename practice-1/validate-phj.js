document.addEventListener("DOMContentLoaded", initForm);
/*
txtName1 자료명
txtOrganization1 기관명
selOrganizationType1 기관종류
*/
// const txtName = document.querySelector("#txtName");
// const txtOrganization = document.querySelector("#txtOrganization");
// const selOrganizationType = document.querySelector("#selOrganizationType");
// let addTable = document.getElementById("active-table");

function initForm() {
  document.querySelector("#btnSave").addEventListener("click", save);

  /**
   * 삭제 컬럼은 첫 번째 컬럼에서는 보이지 않는 부분 구현
   */
}

function save() {
  if (!validate()) {
    alert("저장 실패!");
    return;
  }

  alert("저장 성공!");
}

// 성공 시 true 반환
function validate() {
  /**
   * 코드 작성.
   * 자료명은 필수 입력. 기관명-기관 종류는 세트(하나라도 입력 시 둘 모두 필수 입력, 하나도 입력하지 않을 시 저장 가능)
   * 추가 된 컬럼(AddRow) 또한 Validate 하도록 만들어야 함.
   * 또한 저장 실패 시, 해당 에러 난 Input에 Focus 가도록 설정.
   */

  return true;
}

// 추가 버튼 클릭 시 동작하는 함수 구현
function addRow() {
  /**
   * 코드 작성.
   * 추가 버튼 클릭 시 아래에 컬럼 추가. 번호 및 ID는 순차적으로 증가.
   * 추가 컬럼은 총 10번까지 동작하도록 구현.
   */
  let addTable = document.getElementById("active-table");
  console.log("addTable::::", addTable);

  //테이블 마지막에 row 추가하기 위한 작업
  let lastRow = addTable.rows.length;
  let ieration = lastRow;
  let row = addTable.insertRow(lastRow);
  console.log("lastRow:::::", lastRow);
  // console.log("row:::::", row);
  // 번호(text);
  let count = row.insertCell(0);
  // console.log("count::::", count);
  let textCount = document.createTextNode(ieration);
  // count.appendChild(textCount);
  count.append(textCount);

  //자료명(inputbox)
  let txtName = row.insertCell(1);
  let txtNameCopy = document.querySelector("#txtName");
  // console.log("txtNameCopy::::", txtNameCopy);
  let txtNameResult = txtNameCopy.cloneNode(true);
  // txtName.appendChild(txtNameResult);
  txtName.append(txtNameResult);

  //기관명(inputbox)
  let txtOrganization = row.insertCell(2);
  let txtOrganizationCopy = document.querySelector("#txtOrganization");
  // console.log("txtOrganizationCopy::::", txtOrganizationCopy);
  let txtOrganizationResult = txtOrganizationCopy.cloneNode(true);
  // txtOrganization.appendChild(txtOrganizationResult);
  txtOrganization.append(txtOrganizationResult);

  //기관종류(selectBox))
  let selOrganizationType = row.insertCell(3);
  let selOrganizationTypeCopy = document.querySelector("#selOrganizationType");
  // console.log("selOrganizationTypeCopy::::", selOrganizationTypeCopy);
  let selOrganizationTypeResult = selOrganizationTypeCopy.cloneNode(true);
  // selOrganizationType.appendChild(selOrganizationTypeResult);
  selOrganizationType.append(selOrganizationTypeResult);

  //추가/삭제(button)
  let addRow = row.insertCell(4);
  let addRowCopy = document.querySelector("#addRow");
  // console.log("addRowCopy::::", addRowCopy);
  let addRowResult = addRowCopy.cloneNode(true);
  // addRow.appendChild(addRowResult);
  let delRowCopy = document.querySelector("#delRow");
  // console.log("delRowCopy::::", delRowCopy);
  let delRowResult = delRowCopy.cloneNode(true);
  // addRow.appendChild(addRowResult, delRowResult);
  addRow.append(addRowResult, delRowResult);
}

// 삭제 버튼 클릭 시 동작하는 함수 구현
function delRow() {
  /**
   * 코드 작성.
   * 삭제 버튼 클릭 시 현재 입력된 컬럼 데이터 삭제 및 숨기기
   * 단 삭제는 맨 마지막 버튼부터 클릭할 수 있음.
   */
  console.log("delRowastRow::::", lastRow);
  let delTable = document.getElementById("active-table");
  delTable.deleteRow(-1);
}
