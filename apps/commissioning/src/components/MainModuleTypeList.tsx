import { useIntl } from 'react-intl';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type MainModule = {
  id: number;
  name: string;
  manufacturerName: string;
  wattpeak: number;
  onClick: (id: number) => void;
};

export type MainModuleTypeListProps = {
  modules: MainModule[];
};

export function MainModuleTypeList({ modules }: MainModuleTypeListProps) {
  const intl = useIntl();

  return (
    <List>
      {modules.map(({ id, name, manufacturerName, wattpeak, onClick }, idx) => (
        <ListItem variant="primary" key={id} data-cy={`module-${idx}`}>
          <button
            className="flex w-full cursor-pointer gap-5"
            onClick={() => onClick(id)}
            type="button"
          >
            <div className="bg-brand-two-300 flex aspect-square w-11 items-center justify-center rounded-full">
              <SvgIcon name="SolarPanel" className="w-6 text-white" />
            </div>
            <div>
              <Typography weight="medium" className="text-left">
                {manufacturerName} {name}
              </Typography>
              <Typography variant="label" className="text-left">
                {intl.formatMessage({ defaultMessage: 'Wattpeak' })}: {wattpeak}{' '}
                {intl.formatMessage({ defaultMessage: 'Wp' })}
              </Typography>
            </div>
          </button>
        </ListItem>
      ))}
    </List>
  );
}
