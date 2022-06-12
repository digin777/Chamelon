import React, { useState, useEffect } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { feildprops } from '../Feild';
type OnChangeHandler = (e: any) => void;
interface MyInputProps {
  value: any;
  onChange: OnChangeHandler
}
function Uploader(props: any) {
  var { rest, value, onChange } = props;
  const [filelist, setfilelist] = useState<undefined | any[]>(undefined);
  // if (value) {
  //   if (!filelist) {
  //     console.log(value.fileList);
  //     setfilelist(value.fileList);
  //   }
  // }
  const triggerChange = (changedValue?: any[]) => {
    if (changedValue?.length === 0)
      onChange?.(undefined);
    else
      onChange?.({ fileList: changedValue, ...value, });
  };
  const handleChange = (info: any) => {
    let file = info.file;
    let fileList = [];
    // if (file.status === 'done') {
    fileList = [...info.fileList];
    fileList = fileList.filter(file => file.status === 'done');

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    triggerChange(fileList);
    // }
  };
  return (
    <Upload
      multiple={false}
      onChange={handleChange}
      defaultFileList={filelist}
      {...rest.additional}
    >
      <Button icon={<UploadOutlined />}>{props.placeholder}</Button>
    </Upload>
  )
}

export default Uploader
