import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ComponentImage } from 'aesirx-uikit';
import styles from './index.module.scss';
import { ModalDAMComponent } from 'aesirx-uikit';

const FormImage = ({ field, hiddenDelete = false }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(field.value);
  const onSelect = (data) => {
    setFile(data[0]);
    field.changed(data);
    setShow(false);
  };
  return (
    <>
      <ModalDAMComponent show={show} onHide={() => setShow(false)} onSelect={onSelect} />
      <div className={`position-relative mb-24`}>
        {file && !hiddenDelete && (
          <div className={`position-absolute top-0 start-100 text-end cursor-pointer`}>
            <div
              className="bg-danger p-sm"
              onClick={() => {
                setFile(null);
                field.changed([{ download_url: '' }]);
              }}
            >
              <Icon className="text-white" width={24} height={24} icon="ion:trash-outline" />
            </div>
          </div>
        )}
        <div
          className={`${styles['border']} d-flex align-items-center justify-content-center cursor-auto `}
        >
          {file ? (
            <div
              key={field.value}
              onClick={() => setShow(true)}
              className={`${styles['limit-image']} text-center cursor-pointer zindex-1`}
            >
              <ComponentImage src={file.download_url || file} alt={file?.name ?? 'Image'} />
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center p-40 zindex-1">
              <p className="mb-3">{t('txt_up_file')}</p>
              <p
                onClick={() => setShow(true)}
                className="bg-white cursor-pointer text-secondary border rounded-1 py-11 px-3 mb-0"
              >
                {t('txt_select_file')}
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="mb-0">{t('txt_max_size') + ': 10.00 MB'}</p>
    </>
  );
};
export default FormImage;
