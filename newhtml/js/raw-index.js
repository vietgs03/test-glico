function OnDocumentReady(response) {
    function setProvinceOptions() {
        $.ajax({
            url: `/address/getprovinces`,
            type: 'GET',
            async: false,
            success: function (response) {
                let data = JSON.parse(response);
                let selectElement = $('#main-province')
                if (data != null && data != undefined) {
                    let html = '';
                    html += '<option style="font-weight: bold" value="">Tỉnh/TP sinh sống</option>';
                    $.each(data, function (key, item) {
                        html += ` <option value="${item.Code}">${item.Name}</option>`;
                    });
                    selectElement.html(html);
                }
            }
        });
    }
    setProvinceOptions();
    function setDistrictOptions(provinceCode) {
        $.ajax({
            url: `/address/getdistricts?provinceCode=${provinceCode}`,
            type: 'GET',
            cache: false,
            success: function (response) {
                let data = JSON.parse(response);
                if (data != null && data != undefined) {
                    let html = '';
                    html += '<option style="font-weight: bold" value="">Chọn Quận / Huyện</option>';
                    $.each(data, function (key, item) {
                        html += '<option ' + ' value=' + item.Code + '>' + item.Name + '</option>';
                    });
                    $('.district-select').html(html);
                }
            }
        });
    }

    function setStoreOptions(districtCode, provinceCode) {
        $.ajax({
            url: `/address/getstores?districtCode=${districtCode}&provinceCode=${provinceCode}`,
            type: 'GET',
            success: function (response) {
                let data = JSON.parse(response);
                if (data != null && data != undefined) {
                    let html = '<option style="font-weight: bold" value="">Chọn cửa hàng TH True Mart để nhận thưởng</option>';
                    $.each(data, function (key, item) {
                        html += '<option ' + ' value=' + item.Code + '>' + item.Address + '</option>';
                    });
                    $('.store-select').html(html);

                }
                if (data.length == 0) {
                    $('.valid-store').html("Hiện tại khu vực này chưa có cửa hàng TH Mart. Bộ phận CSKH của TH sẽ liên hệ quý khách để hướng dẫn trao thưởng");
                } else {
                    $('.valid-store').html("");
                }
            }
        });
    }

    function setDefaultOption(selectType) {
        let defaultOption = '';
        let element;
        switch (selectType) {
            case 'district':
                defaultOption = '<option style="font-weight: bold" value="">Chọn Quận / Huyện</option>';
                element = $(`.district-select`);
                break;
            case 'store':
                defaultOption = '<option style="font-weight: bold" value="">Chọn cửa hàng TH True Mart để nhận thưởng</option>';
                element = $(`.store-select`);
                break;
        }
        element.html(defaultOption);
    }

  function setDistrictOnChange(provinceCode) {
        $('.district-select').on('change', function () {
            let districtCode = $(this).val();
            if (typeof (districtCode) == 'undefined') return false;
            if (districtCode == '' || districtCode == null) {
                setDefaultOption('store');
            } else setStoreOptions(districtCode, provinceCode);
        });
    }
  function initSpecialPrizeFormSelects() {
    let provinceCode = $('.province-select').val();
    setDistrictOptions(provinceCode);
    setDistrictOnChange(provinceCode);
    }
    $('body').on('click', '.confirm-info', function () {
        $(".modal").removeClass("show");
        $(".modal-backdrop").removeClass("show");
        $("body").removeClass("no-scroll");
    });
    $('body').on('click', '.change-info', function () {
        $(".modal").removeClass("show");
        $(".modal-backdrop").removeClass("show");
        $("body").removeClass("no-scroll");
    });
    const showNotWinModal = () => {
      $(".popup-khong-trung").addClass("show");
      $(".modal-backdrop").addClass("show");
      $("body").addClass("no-scroll");
      return false;
    };
    const showNotiModal = (message) => {
        $('.text-noti').html(message);
      $(".modal-backdrop").addClass("show");
        $(".popup-noti").addClass("show");
      $("body").addClass("no-scroll");
    };
    const showGiaiMayMan = () => {
        $('.popup-giai-may-man').addClass('show');
      $(".modal-backdrop").addClass("show");
      $("body").addClass("no-scroll");
      return false;
    };
    const showGiaiTaiLoc = () => {
        $('.popup-giai-tai-loc').addClass('show');
      $(".modal-backdrop").addClass("show");
      $("body").addClass("no-scroll");
      return false;
    };

    $('body').on('click', '.btn-confirm-sdt', function () {
        $(".popup-sai-sdt").removeClass("show");
        showGiaiTaiLoc();
    });

    $('body').on('click', '.btn-no-rephone', function () {
        updateInfoForm.submit();
    });
    const showLoadingModal = (message, animation = 'wave') => {
      $('body').loadingModal({
        text: message,
        position: 'auto',
        color: '#fff',
        opacity: '0.7',
        backgroundColor: 'rgb(0,0,0)',
        animation
        //rotatingPlane , wave , wanderingCubes , spinner ,chasingDots
        // threeBounce , circle ,cubeGrid ,fadingCircle ,foldingCube
      });
    };
    const closeBtn = $(".close-popup");
    closeBtn.click(function () {
        $(".modal").removeClass("show");
        $(".modal-backdrop").removeClass("show");
        $("body").removeClass("no-scroll");
    });

    
    // lấy kết quả trả về
    const showWinModal = (prize) => {
      $(".modal").removeClass("show");
      if (prize == '2') {
          showGiaiMayMan();
      } else if (prize == '1') {
        initSpecialPrizeFormSelects()
          showGiaiTaiLoc();
      } else {
        $('.popup-khong-trung').addClass('show');
      }
      $(".modal-backdrop").addClass("show");
      $("body").addClass("no-scroll");
      return false;
    };


  if (response != null && typeof response != 'undefined') {
    if (response.Type == 'winPrize') showWinModal(response.Prize);
    else if (response.Type == 'notWin') showNotWinModal();
    else showNotiModal(response.Message);
    }
    let form = $(".form-quay-thuong");
    let submitButton = $(".submit-btn");
    submitButton.click(function () {
        submitButton.attr('disabled', true);
        setTimeout(function () {
            submitButton.attr('disabled', false);
        }, 1000);
        let isValid = form.valid();

        let codemain = $("#main-code").val();
        let namemain = $("#main-name").val();
        
        if (isValid && codemain.trim() != "" && namemain.trim() != "") {


            let isChecked = $(this).parent().find('.confirm input').is(':checked');
            if (!isChecked) {
                $(".not-confirm").addClass("show");
                $(".modal-backdrop").addClass("show");
                $("body").addClass("no-scroll");
                return false;
            } else {
                let phoneVal = $("#main-phone").val();
                let codeVal = $("#main-code").val();
                let nameVal = $("#main-name").val();
                let cityVal = $("#main-province option:selected").text();
                $("#confirm-phone").val(phoneVal);
                $("#confirm-code").val(codeVal);
                $("#confirm-name").val(nameVal);
                $("#confirm-province").val(cityVal);
                $(".confirm-infomation").addClass("show");
                $(".modal-backdrop").addClass("show");
                $("body").addClass("no-scroll");
                $('#confirm-btn').click(function () {
                    $(this).attr('disabled', true);
                    $(".modal").removeClass("show");
                    $(".modal-backdrop").removeClass("show");
                    $("body").removeClass("no-scroll");
                    $(".form-quay-thuong").submit();
                    showLoadingModal();
                });
                return false;
            }
        } else {
            if (codemain.trim() == "" || namemain.trim() == "") {
                if (namemain.trim() == "") {
                    $(".valid-namemain").html("Vui lòng nhập họ tên!");
                } else {
                    $(".valid-namemain").html("");
                }
                if (codemain.trim() == "") {
                    $(".valid-codemain").html("Vui lòng nhập mã dự thưởng!");
                } else {
                    $(".valid-codemain").html("");
                }
                submitButton.attr('disabled', true);
            }
        
            return false;
        }

    });


    let updateInfoButton = $("#update-info-btn");
    let updateInfoForm = $("#update-info-form");
    updateInfoButton.click(function () {
        let rephoneVal = $("#RePhoneNumber").val();
        let phoneVal = $("#main-phone").val();
      updateInfoButton.attr('disabled', true);
      setTimeout(function () {
        updateInfoButton.attr('disabled', false);
      }, 1000);
        if (updateInfoForm.valid()) {
            //Khi có cửa hàng thì bắt buộc chọn
            if ($('#store-option option').length > 1) {
                let storeVal = $(".store-select option:selected").text();
                if (storeVal == "Chọn cửa hàng TH True Mart để nhận thưởng") {
                    $('.valid-store').html("Vui lòng chọn cửa hàng để nhận thưởng!");
                    return false;
                } else {
                    $('.valid-store').html("");
                }
            }
            //Phone khác rephone thì hiện popup
            if (rephoneVal != phoneVal) {
                $('.popup-giai-tai-loc').removeClass('show');
                $('.popup-sai-sdt').addClass('show');
            }
            else {
                updateInfoForm.submit();
            }
        }
      else
      {
        return false;
      }

    });
}