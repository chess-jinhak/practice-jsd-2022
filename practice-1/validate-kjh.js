document.addEventListener('DOMContentLoaded', initForm);
const fileName = document.querySelector('#txtName1');
const organizationName = document.querySelector('#txtOrganization1');
const organizationType = document.querySelector('#selOrganizationType1');
const btnAdd = document.getElementsByTagName('button')[0];
const btnDelete = document.getElementsByTagName('button')[1];
const tbody = document.getElementsByTagName('tbody')[0];

let index = 2;

function initForm() {
  document.querySelector('#btnSave').addEventListener('click', save);
  btnAdd.addEventListener('click', addRow);
  btnDelete.disabled = true;
  fileName.focus();
  /**
   * 삭제 컬럼은 첫 번째 컬럼에서는 보이지 않는 부분 구현
   */
}

function save() {
  if (!validate()) {
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

  if (
    !fileName.value ||
    !(!!organizationName.value ^ isNaN(organizationType.value))
  ) {
    if (!fileName.value) {
      fileName.focus();
    } else if (!organizationName.value) {
      organizationName.focus();
    } else {
      organizationType.focus();
    }
    return false;
  }
  return true;
}

// 추가 버튼 클릭 시 동작하는 함수 구현
function addRow() {
  /**
   * 코드 작성.
   * 추가 버튼 클릭 시 아래에 컬럼 추가. 번호 및 ID는 순차적으로 증가.
   * 추가 컬럼은 총 10번까지 동작하도록 구현.
   */
  if (!validate()) {
    alert('저장 실패!');
    return;
  }
  const newFileName = document.createElement('DIV');
  const newOrgName = document.createElement('DIV');
  const newOrgType = document.createElement('DIV');
  newFileName.innerHTML = fileName.value;
  newOrgName.innerHTML = organizationName.value || '-';
  newOrgType.innerHTML = !isNaN(organizationType.value)
    ? organizationType[organizationType.value].text
    : '-';

  const TR = document.createElement('TR');
  const TH = document.createElement('TH');
  TH.innerHTML = index;
  TH.className = 'align-middle';
  TH.setAttribute('scope', 'row');

  const TD1 = document.createElement('TD');
  const TD2 = document.createElement('TD');
  const TD3 = document.createElement('TD');
  const TD4 = document.createElement('TD');
  const tdStyle = 'form-control-plaintext align-middle';

  TD1.appendChild(newFileName);
  newFileName.className = tdStyle + ' text-start px-1';
  TD2.appendChild(newOrgName);
  newOrgName.className = tdStyle;
  TD3.appendChild(newOrgType);
  newOrgType.className = tdStyle;

  const btnAddClone = btnAdd.cloneNode(true);
  btnAddClone.disabled = true;
  const btnDeleteClone = btnDelete.cloneNode(true);
  btnDeleteClone.addEventListener('click', delRow);
  btnDeleteClone.disabled = false;
  /** disable prev btnDeleteClone */
  if (index > 2) {
    const lastChild = tbody.lastElementChild;
    lastChild.lastChild.lastChild.disabled = true;
  }

  TD4.appendChild(btnAddClone);
  TD4.appendChild(btnDeleteClone);
  TD4.style.display = 'flex';
  TD4.style.justifyContent = 'space-between';

  TR.appendChild(TH);
  TR.appendChild(TD1);
  TR.appendChild(TD2);
  TR.appendChild(TD3);
  TR.appendChild(TD4);
  tbody.appendChild(TR);
  /** reset values */
  fileName.value = '';
  organizationName.value = '';
  organizationType.value = organizationType[0].text;
  // console.log(tbody);

  if (index > 10) {
    btnAdd.disabled = true;
  }
  ++index;
  fileName.focus();
}

// 삭제 버튼 클릭 시 동작하는 함수 구현
function delRow() {
  /**
   * 코드 작성.
   * 삭제 버튼 클릭 시 현재 입력된 컬럼 데이터 삭제 및 숨기기
   * 단 삭제는 맨 마지막 버튼부터 클릭할 수 있음.
   */
  tbody.removeChild(tbody.lastChild);
  --index;
  if (index > 2) {
    tbody.lastChild.lastChild.lastChild.disabled = false;
  }
  if (index === 10) {
    btnAdd.disabled = false;
  }
  fileName.focus();
}
