export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;
  const checks = [
    {
      msg: 'Nama, Deskripsi, Merek berhasil ditambahkan.',
      type: 'success',
    },
  ];
  if (images.length < 1) {
    checks.push({
      msg: `Pilih minimal 1 gambar (${1 - images.length} tersisa).`,
      type: 'error',
    });
  } else {
    checks.push({
      msg: `${images.length} gambar yang dipilih.`,
      type: 'success',
    });
  }
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i].qty == '' || sizes[i].price == '' || sizes[i].size == '') {
      checks.push({
        msg: `Harap isi semua informasi type.`,
        type: 'error',
      });
      break;
    } else {
      checks.push({
        msg: `Setidaknya satu type/jumlah/harga ditambahkan.`,
        type: 'success',
      });
    }
  }
  for (var i = 0; i < details.length; i++) {
    if (details[i].name == '' || details[i].value == '') {
      checks.push({
        msg: `Harap isi semua informasi pada detail.`,
        type: 'error',
      });
      break;
    } else {
      checks.push({
        msg: `Setidaknya satu detail ditambahkan.`,
        type: 'success',
      });
    }
  }
  // for (var i = 0; i < questions.length; i++) {
  //   if (questions[i].question == '' || details[i].answer == '') {
  //     checks.push({
  //       msg: `Please fill all informations on questions.`,
  //       type: 'error',
  //     });
  //     break;
  //   } else {
  //     checks.push({
  //       msg: `Atleast one question added.`,
  //       type: 'success',
  //     });
  //   }
  // }
  var s_test = checks.find((c) => c.type == 'error');
  if (s_test) {
    return checks;
  } else {
    return 'valid';
  }
};

export const validateEditProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;
  const checks = [
    {
      msg: 'Nama, Deskripsi, Merek berhasil diperbarui.',
      type: 'success',
    },
  ];
  if (images && images.length < 1) {
    checks.push({
      msg: `Pilih minimal 1 gambar (${1 - images.length} tersisa).`,
      type: 'error',
    });
  } else if (images) {
    checks.push({
      msg: `${images.length} gambar yang dipilih.`,
      type: 'success',
    });
  }
  for (var i = 0; i < sizes?.length; i++) {
    if (sizes[i].qty === '' || sizes[i].price === '' || sizes[i].size === '') {
      checks.push({
        msg: `Harap isi semua informasi untuk tipe.`,
        type: 'error',
      });
      break;
    } else {
      checks.push({
        msg: `Setidaknya satu jenis/jumlah/harga ditambahkan.`,
        type: 'success',
      });
    }
  }
  for (var i = 0; i < details.length; i++) {
    if (details[i].name === '' || details[i].value === '') {
      checks.push({
        msg: `Harap isi semua informasi untuk detailnya.`,
        type: 'error',
      });
      break;
    } else {
      checks.push({
        msg: `Setidaknya satu detail ditambahkan.`,
        type: 'success',
      });
    }
  }
  // for (var i = 0; i < questions.length; i++) {
  //   if (questions[i].question === '' || questions[i].answer === '') {
  //     checks.push({
  //       msg: `Please fill all information for questions.`,
  //       type: 'error',
  //     });
  //     break;
  //   } else {
  //     checks.push({
  //       msg: `At least one question added.`,
  //       type: 'success',
  //     });
  //   }
  // }
  var s_test = checks.find((c) => c.type === 'error');
  if (s_test) {
    return checks;
  } else {
    return 'valid';
  }
};
