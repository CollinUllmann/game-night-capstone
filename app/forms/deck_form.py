from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length


class NewDeckForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
  format = SelectField('format', choices = ['Modern', 'Legacy', 'Commander'])
  cards = StringField('cards', validators=[DataRequired()])