from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length


class NewMatchForm(FlaskForm):
  event_id = IntegerField('event_id', validators=[DataRequired()])
  user_id_winner = SelectField('user_id_winner', choices=[])
  deck_ids = StringField('deck_ids', validators=[DataRequired()])
