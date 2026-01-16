type MenuItem = {
  label: string;
  path?: string;
};

type MenuSectionProps = {
  items: MenuItem[];
};

export default function MenuCard() {
  return (
    <div className="w-full space-y-3">
      {/* SECTION 1 */}
      <MenuSection
        items={[
          { label: 'CAPTURE AREA' },
        ]}
      />

      {/* SECTION 2 */}
      <MenuSection
        items={[
          { label: 'NEW COMMENTS', path: '/comments' },
          { label: 'GO TO DIRECTORY', path: '/directory' },
        ]}
      />

      {/* SECTION 3 */}
      <MenuSection
        items={[
          { label: 'NOTIFICATIONS ON' },
          { label: 'SOUND NOTIFICATIONS ON' },
        ]}
      />


    </div>
  );
}

function MenuSection({ items }: MenuSectionProps) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden
        divide-y divide-gray-100
      "
    >
      {items.map((item, index) => {
        const content = (
          <div
            className="
              flex items-center justify-between
              px-5 py-4
              text-sm font-medium
              text-gray-800
            "
          >
            <span>{item.label}</span>
            {item.path && (
              <span className="text-gray-400">{'>'}</span>
            )}
          </div>
        );

        return item.path ? (
          <a
            key={index}
            href={item.path}
            className="block hover:bg-gray-50 transition"
          >
            {content}
          </a>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );
}
