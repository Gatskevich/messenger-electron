import { updateSettings } from "@renderer/actions/settings";
import { withBaseLayout } from "@renderer/layouts/Base";
import { AppDispatch, RootState } from "@renderer/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Settings() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    isDarkTheme,
    showNotifications,
    playSound } = useSelector(({settings}:  RootState) => settings)

  const { register } = useForm({
    defaultValues: {
      isDarkTheme,
      showNotifications,
      playSound
    }
  });

  const handleChange = (name: string, checked: boolean) => {
    dispatch(updateSettings({setting: name, value: checked}));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form>
          <div className="my-3">
            <div className="form-check">
              <input
                {...register("isDarkTheme")}
                type="checkbox"
                className="form-check-input"
                onChange={(e) => handleChange("isDarkTheme", e.target.checked)}
              />
              <label className="form-check-label">Dark Theme</label>
            </div>
            <div className="form-check">
              <input
                {...register("showNotifications")}
                type="checkbox"
                className="form-check-input"
                onChange={(e) => handleChange("showNotifications", e.target.checked)}
              />
              <label className="form-check-label">Enable Notification</label>
            </div>
            <div className="form-check">
              <input
                {...register("playSound")}
                type="checkbox"
                className="form-check-input"
                onChange={(e) => handleChange("playSound", e.target.checked)}
              />
              <label className="form-check-label">Sound Notification</label>
            </div>
          </div>
          <button
              type="button"
              onClick={() => window.electron.appApi.quitApp()}
              className="btn btn-danger">
              Quit App
            </button>
        </form>
      </div>
    </div>
  );
}

export default withBaseLayout(Settings, {canGoBack: true});
