document.addEventListener('DOMContentLoaded', initForm);

function initForm() {
  document.querySelector('#btnSave').addEventListener('click', save);

  /**
   * 삭제 컬럼은 첫 번째 컬럼에서는 보이지 않는 부분 구현
   */

  /**
   * @type { HTMLButtonElement }
   */
  const btnAdd = document.querySelector('table tbody button.btn-primary');
  btnAdd.addEventListener('click', addRow);
  /**
   * @type { HTMLButtonElement }
   */
  const btnDel = document.querySelector('table tbody button.btn-danger');
  btnDel.style.display = 'none';
}

function save() {
  if (!validate()) {
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
  const tableRows = [ ...document.querySelectorAll('table tbody tr') ];
  let isValid = true;
  tableRows.forEach((tableRow, idx) => {
    if ( !isValid ){
      return;
    }

    /**
     * @type { HTMLInputElement }
     */
    const txtName = tableRow.querySelector('input[id^=txtName]');
    if(txtName.value.trim() == '') {
      alert(`자료명${idx + 1}을 입력해주세요`);
      txtName.focus();
      isValid = false;
      return false;
    }

    /**
     * @type { HTMLInputElement }
     */
    const txtOrganization = tableRow.querySelector('input[id^=txtOrganization]');
    /**
     * @type { HTMLSelectElement  }
     */
    const selOrganizationType = tableRow.querySelector('select[id^=selOrganizationType]');
    const isAllEmptyOrganization = txtOrganization.value.trim() == '' && selOrganizationType.selectedIndex == 0;
    const isAllCompleteOrganization = txtOrganization.value.trim() != '' && selOrganizationType.selectedIndex != 0;

    if ( !isAllEmptyOrganization && !isAllCompleteOrganization ) {
      if ( txtOrganization.value.trim() == '' ) {
        alert(`기관명${idx + 1}을 입력해주세요`);
        txtOrganization.focus();
      } else {
        alert(`기관종류${idx + 1}를 선택해주세요`);
        selOrganizationType.focus();
      }
      
      isValid = false;
      return false;
    }

    return true;
  });

  return isValid;
}

// 추가 버튼 클릭 시 동작하는 함수 구현
function addRow() {
  /**
   * 코드 작성.
   * 추가 버튼 클릭 시 아래에 컬럼 추가. 번호 및 ID는 순차적으로 증가.
   * 추가 컬럼은 총 10번까지 동작하도록 구현.
   */

  const newIdx = document.querySelectorAll('table tbody tr').length + 1;
  if (newIdx > 10) {
    alert('더 이상 추가할 수 없습니다.');
    return;
  }

  /**
   * @type { HTMLTableRowElement }
   */
  const cloneTableRow = this.closest('tr').cloneNode(true);
  const setInputContent = () => {
    cloneTableRow.querySelector('tr th').innerText = newIdx;
    cloneTableRow.querySelectorAll('input,select').forEach(input => {
      const newId = input.getAttribute('id').replace(/\d/, newIdx);
      input.setAttribute('id', newId);

      if(input.tagName == 'SELECT') {
        input.querySelector('option').selected = true;
      } else {
        input.value = '';
      }
    });

    /**
     * @type { HTMLButtonElement }
     */
    const btnAdd = cloneTableRow.querySelector('button.btn-primary');
    /**
     * @type { HTMLButtonElement }
     */
    const btnDel = cloneTableRow.querySelector('button.btn-danger');

    btnAdd.addEventListener('click', addRow);
    btnDel.addEventListener('click', delRow);
    if (newIdx == 10) {
      btnAdd.style.display = 'none';
    }
    btnDel.style.display = '';
  };

  setInputContent();

  /**
   * @type { HTMLTableSectionElement }
   */
  const tbody = this.closest('tbody');
  tbody.appendChild(cloneTableRow);
}

// 삭제 버튼 클릭 시 동작하는 함수 구현
function delRow() {
  /**
   * 코드 작성.
   * 삭제 버튼 클릭 시 현재 입력된 컬럼 데이터 삭제 및 숨기기
   * 단 삭제는 맨 마지막 버튼부터 클릭할 수 있음.
   */
  /**
   * @type { HTMLTableRowElement }
   */
  const thisTableRow = this.closest('tr');

  const maxIdx = document.querySelectorAll('table tbody tr').length;
  const thisIdx = thisTableRow.querySelector('th').innerText;
  if (maxIdx != thisIdx) {
    alert('마지막 행부터 삭제해주세요');
    return;
  }

  thisTableRow.remove();
}