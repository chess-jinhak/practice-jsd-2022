/** JavaScript version */
// document.addEventListener('DOMContentLoaded', initForm);
// const tbody = document.getElementsByTagName('tbody')[0];

/** jQuery version */
$(document).ready(initForm);
const $tbody = $(document).find('tbody');

let index = 2;

function initForm() {
  /**
   * 삭제 컬럼은 첫 번째 컬럼에서는 보이지 않는 부분 구현
   */
  /** JavaScript version */
  // document.querySelector('#btnSave').addEventListener('click', save);
  // document.getElementsByTagName('button')[0].addEventListener('click', addRow);
  // document.getElementsByTagName('button')[1].style.display = 'none';
  // document.querySelector('#txtName1').focus();

  /** jQuery version */
  $(document).find('#btnSave').click(save);
  $tbody.find('.btn.btn-primary').click(addRow);
  $tbody.find('.btn.btn-danger').css('display', 'none');
  $tbody.find('#txtName1').focus();
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
  /** JavaScript version */
  // const allFileNames = document.querySelectorAll('input[id^="txtName"]');
  // for (const file of allFileNames) {
  //   if (!file.value) {
  //     file.focus();
  //     return false;
  //   }
  // }
  // for (const tr of tbody.children) {
  //   const orgName = tr.querySelector('input[id^="txtOrganization"]');
  //   const orgType = tr.querySelector('select');

  //   if (!(!!orgName.value ^ isNaN(orgType.value))) {
  //     if (!orgName.value) {
  //       orgName.focus();
  //     } else {
  //       orgType.focus();
  //     }
  //     return false;
  //   }
  // }
  // return true;

  /** jQuery version */
  const $allFileNames = $('input[id^="txtName"]');
  for (const file of $allFileNames) {
    if (!$(file).val()) {
      file.focus();
      return false;
    }
  }
  for (const tr of $tbody.children()) {
    const $orgName = $(tr).find('input[id^="txtOrganization"]');
    const $orgType = $(tr).find('select');

    if (!(!!$orgName.val() ^ isNaN($orgType.val()))) {
      if (!$orgName.val()) {
        $orgName.focus();
      } else {
        $orgType.focus();
      }
      return false;
    }
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
  if (index > 10) {
    alert('10개 이상 추가 불가');
    return;
  }
  /** JavaScript version */
  // const TR = tbody.firstElementChild.cloneNode(true);
  // const TH = TR.firstElementChild;
  // TH.innerHTML = index;
  // const newFileName = TR.querySelector('input[id^="txtName"]');
  // newFileName.value = '';
  // newFileName.setAttribute('id', `txtName${index}`);
  // const newOrgName = TR.querySelector('input[id^="txtOrganization"]');
  // newOrgName.value = '';
  // newOrgName.setAttribute('id', `txtOrganization${index}`);
  // const newOrgType = TR.querySelector('select');
  // newOrgType.setAttribute('id', `selOrganizationType${index}`);
  // const newBtnDel = TR.lastElementChild.lastElementChild;
  // const newBtnAdd = TR.lastElementChild.firstElementChild;
  // newBtnDel.addEventListener('click', delRow);
  // newBtnDel.style.display = 'inline-block';
  // if (index <= 9) {
  //   newBtnAdd.addEventListener('click', addRow);
  // } else {
  //   newBtnAdd.style.display = 'none';
  // }
  // tbody.appendChild(TR);

  // ++index;
  // newFileName.focus();

  /** jQuery version */
  const $TR = $(document).find('tbody tr:first-child').clone(true);
  const $TH = $TR.find('th');
  $TH.html(index);
  const $newFileName = $TR.find('input[id^="txtName"]');
  $newFileName.val('');
  $newFileName.attr('id', `txtName${index}`);
  const $newOrgName = $TR.find('input[id^="txtOrganization"]');
  $newOrgName.val('');
  $newOrgName.attr('id', `txtOrganization${index}`);
  const $newOrgType = $TR.find('select');
  $newOrgType.attr('id', `selOrganizationType${index}`);
  const $newBtnDel = $TR.find('.btn.btn-danger').first();
  const $newBtnAdd = $TR.find('.btn.btn-primary').first();
  $newBtnDel.click(delRow);
  $newBtnDel.css({ display: 'inline-block' });
  if (index > 9) {
    $newBtnAdd.css({ display: 'none' });
  }
  $tbody.append($TR);

  ++index;
  $newFileName.focus();
}

// 삭제 버튼 클릭 시 동작하는 함수 구현
function delRow(e) {
  /**
   * 코드 작성.
   * 삭제 버튼 클릭 시 현재 입력된 컬럼 데이터 삭제 및 숨기기
   * 단 삭제는 맨 마지막 버튼부터 클릭할 수 있음.
   */
  /** JavaScript version */
  // const clickedIdx = e.target.parentNode.parentNode.firstElementChild.innerHTML;
  // if (clickedIdx != index - 1) {
  //   alert('마지막 줄만 삭제할 수 있습니다');
  //   return;
  // }
  // tbody.removeChild(tbody.lastChild);
  // --index;

  /** jQuery version */
  const clickedIdx = $(e.target).closest('tr').find('th').html();
  if (clickedIdx != index - 1) {
    alert('마지막 줄만 삭제할 수 있습니다');
    return;
  }
  $tbody.find('tr:last-child').remove();
  --index;
}
