import { forwardRef, useRef, useState, useLayoutEffect } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { css, Theme } from '@emotion/react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.vite';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Skeleton from '@mui/material/Skeleton';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export interface PdfViewerProps {
  pdfUrl: string;
}

const containerStyle = () => (theme: Theme) =>
  css({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0px 0px ${theme.spacing(1)} 0px ${theme.palette.secondary.main}40`,
  });

const useWidth = (target: any) => {
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    setWidth(target.current.getBoundingClientRect().width);
  }, [target]);

  useResizeObserver(target, (entry) => setWidth(entry.contentRect.width));
  return width;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PdfViewer = forwardRef<HTMLDivElement, PdfViewerProps>((props, ref) => {
  const { pdfUrl } = props;
  const wrapperDiv = useRef(null);
  const width = useWidth(wrapperDiv);

  return (
    <div className="wrapper" css={containerStyle} ref={wrapperDiv}>
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          loading={<Skeleton height={width * 1.4} variant="rounded" width={width} />}
        >
          <Page pageNumber={1} width={width * 0.95} />
        </Document>
      ) : (
        <Skeleton height={width * 1.4} variant="rounded" width={width} />
      )}
    </div>
  );
});
