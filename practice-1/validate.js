document.addEventListener('DOMContentLoaded', initForm);

function initForm() {
  document.querySelector('#btnSave').addEventListener('click', save);

  /**
   * 삭제 컬럼은 첫 번째 컬럼에서는 보이지 않는 부분 구현
   */
}

function save() {
  if(!validate()) {
    alert('저장 실패!');
    return;
  } 

  alert('저장 성공!');
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
}

// 삭제 버튼 클릭 시 동작하는 함수 구현
function delRow() {
  /**
   * 코드 작성.
   * 삭제 버튼 클릭 시 현재 입력된 컬럼 데이터 삭제 및 숨기기
   * 단 삭제는 맨 마지막 버튼부터 클릭할 수 있음.
   */
}
