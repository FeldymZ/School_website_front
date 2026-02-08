interface Props {
  html: string;
  className?: string;
}

const HTMLContent = ({ html, className = "" }: Props) => {
  return (
    <div
      className={`
        prose prose-lg max-w-none
        prose-headings:text-gray-900
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-6
        prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-4
        prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed prose-p:mt-0
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-em:italic
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
        prose-li:text-gray-700 prose-li:marker:text-[#00A4E0] prose-li:leading-relaxed
        prose-blockquote:border-l-4 prose-blockquote:border-[#00A4E0]
        prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
        prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50
        prose-blockquote:rounded-r-lg prose-blockquote:my-6
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1
        prose-code:rounded prose-code:text-sm prose-code:text-pink-600
        prose-code:font-mono prose-code:before:content-['']
        prose-code:after:content-['']
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4
        prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:mb-6
        prose-hr:border-0 prose-hr:border-t-2 prose-hr:border-gray-200
        prose-hr:my-8
        prose-a:text-[#00A4E0] prose-a:no-underline prose-a:font-medium
        prose-a:hover:underline
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HTMLContent;
