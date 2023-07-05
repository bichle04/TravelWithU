'use strict';

/**
 * SCROLL NAV
 */

// Lắng nghe sự kiện nhấp chuột trên các liên kết trong thanh điều hướng
document.addEventListener('DOMContentLoaded', function () {             // 'DOMContentLoaded' để chắc chắn rằng tất cả các phần tử trên trang đã được tải xong
    var navLinks = document.querySelectorAll('.navbar__item-link, .mobile-menu__item-link');     // Lấy tất cả các liên kết trong thanh điều hướng

    for (var i = 0; i < navLinks.length; i++) {                         // Duyệt qua từng liên kết và gắn sự kiện click để cuộn đến phần tử tương ứng
        if (navLinks[i].getAttribute('href') === 'datphong.html') {
            navLinks[i].addEventListener('click', function () {         // Kiểm tra nếu liên kết có href là "datphong.html"
                window.location.href = 'datphong.html';                 // thì chuyển hướng trang khi nhấp chuột vào liên kết.
            });
        } else if (navLinks[i].getAttribute('href') === './LOGIN/login.html') {     // Kiểm tra nếu liên kết có href là "./LOGIN/login.html"
            navLinks[i].addEventListener('click', function () {                     // thì chuyển hướng trang khi nhấp chuột vào liên kết.
                window.location.href = './LOGIN/login.html';
            });
        } else {
            // Thực hiện cuộn đến phần tử tương ứng khi nhấp chuột vào các liên kết khác
            navLinks[i].addEventListener('click', scrollToSection);
        }
    }
});

// Cuộn đến phần tử tương ứng khi nhấp chuột vào liên kết trong thanh điều hướng
function scrollToSection(event) {
    event.preventDefault();                                 // Ngăn chặn hành vi mặc định của sự kiện click

    var targetId = this.getAttribute('href').substring(1);  // Lấy id từ thuộc tính 'href' của liên kết và loại bỏ ký tự '#'
    var targetElement = document.getElementById(targetId);  // Tìm targetElement dựa trên id

    if (targetElement) {                    // Nếu targetElement tồn tại, cuộn đến vị trí của nó với hiệu ứng smooth
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}



/**
 * GO TO TOP
 */

// Khi sự kiện scroll xảy ra trên cửa sổ, gọi hàm scrollFunction()
window.onscroll = function () {
    scrollFunction();
};

// Hàm scrollFunction() kiểm tra vị trí cuộn và hiển thị lên button khi vị trí vượt quá 20px
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";           // Nếu vị trí cuộn vượt quá 20px, hiển thị button
    } else {
        document.getElementById("myBtn").style.display = "none";            // Ngược lại, ẩn button
    }
}

// Khi người dùng nhấp chuột vào button, cuộn lên đầu trang một cách mượt (smooth)
function topFunction() {
    window.scrollTo({           // Sử dụng window.scrollTo() để cuộn đến vị trí top với hiệu ứng smooth
        top: 0,
        behavior: "smooth"
    });
}



/**
 * SHOW PASS
 */

// Hiển thị mật khẩu khi người dùng click vào nút Show
$(function () {

    // Duyệt qua từng phần tử <input> có type là "password" và có thuộc tính data-eye.
    $("input[type='password'][data-eye]").each(function (i) {
        var $this = $(this),                        // Gán biến $this cho phần tử hiện tại và tạo biến id và el
            id = 'eye-password-' + i,               // Tạo ID duy nhất cho các phần tử liên quan đến mật khẩu
            el = $('#' + id);                       // Lưu trữ phần tử có ID tương ứng vào biến el


        $this.wrap($("<div/>", {                    // Bọc phần tử $this bằng một thẻ <div> mới,              
            style: 'position : relative',             // với thuộc tính style và id đã được xác định.
            id: id
        }));

        $this.css({                                 // Thiết lập padding phía bên phải của $this (input) là 60px.
            paddingRight: 60
        });


        $this.after($("<div/>", {                   // Chèn một thẻ <div> sau $this (input),
            html: 'Show',                           // với tên 'Show' và các thuộc tính CSS.
            class: 'btn btn-primary btn-sm',
            id: 'passeye-toggle-' + i,
        }).css({
            position: 'absolute',
            right: 10,
            top: ($this.outerHeight() / 2) - 12,
            padding: '2px 7px',
            fontSize: 12,
            cursor: 'pointer',
        }));


        $this.after($("<input/>", {                 // Thêm một phần tử input[type='hidden'] để lưu trữ giá trị mật khẩu.
            type: 'hidden',
            id: 'passeye-' + i
        }));


        var invalid_feedback = $this.parent().parent().find('.invalid-feedback');
        if (invalid_feedback.length) {              // Nếu có phần tử .invalid-feedback nằm trong cấu trúc cha của $this,
            $this.after(invalid_feedback.clone());  // chèn một bản sao của nó sau phần tử input.
        }



        $this.on("keyup paste", function () {       // Khi người dùng gõ hoặc dán vào phần tử input,
            $("#passeye-" + i).val($(this).val());  // cập nhật giá trị của input[type='hidden'] với giá trị của $this.
        });



        $("#passeye-toggle-" + i).on("click", function () {     // Khi người dùng click vào nút Show,
            if ($this.hasClass("show")) {                       // thay đổi kiểu hiển thị của input giữa 'password' và 'text'.
                $this.attr('type', 'password');
                $this.removeClass("show");
                $(this).removeClass("btn-outline-primary");
            } else {
                $this.attr('type', 'text');
                $this.val($("#passeye-" + i).val());
                $this.addClass("show");
                $(this).addClass("btn-outline-primary");
            }
        });
    });

    $(".my-login-validation").submit(function () {      // Khi người dùng submit form có lớp '.my-login-validation'.
        var form = $(this);
        if (form[0].checkValidity() === false) {        // Nếu form không hợp lệ, 
            event.preventDefault();                     // nó sẽ ngăn chặn hành vi mặc định của submit
            event.stopPropagation();                    // và ngừng lan truyền sự kiện.
        }
        form.addClass('was-validated');                 // Thêm lớp '.was-validated' cho form.
    });
});


/**
 * CHECK INPUT & SHOW NOTIFICATION
 */

// var form = document.querySelector(".datphong-form");
// form.addEventListener("submit", function (event) {
//     event.preventDefault(); // Ngăn chặn gửi biểu mẫu mặc định

//     // Kiểm tra các trường đầu vào
//     var fullName = document.querySelector("input[type='text']").value;
//     var email = document.querySelector("input[type='email']").value;
//     var destination = document.querySelector("select").value;
//     var checkInDate = document.querySelector("input[type='date']:nth-of-type(1)").value;
//     var checkOutDate = document.querySelector("input[type='date']:nth-of-type(2)").value;
//     var rooms = document.querySelector("select:nth-of-type(1)").value;
//     var adults = document.querySelector("select:nth-of-type(2)").value;
//     var children = document.querySelector("select:nth-of-type(3)").value;

//     // Kiểm tra điều kiện
//     if (fullName !== "" && email !== "" && destination !== "" && checkInDate !== "" && checkOutDate !== "" && rooms !== "" && adults !== "") {
//         // Hiển thị thông báo
//         alert("You have successfully registered. Please wait for a response from the email.");
//     } else {
//         alert("Please fill in all the required fields.");
//     }
// });